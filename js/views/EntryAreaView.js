define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
		MakePrettyXml = require('makeprettyxml'),
		PrettyXmlModel = require('models/prettyxml');

	var EntryAreaView = Backbone.View.extend({
		initialize: function(options){
			console.log("Initializing new EntryAreaView...");
			if (!(options && options.model))
				throw new Error("Model is not specified.");
			if (!(options.listModel))
				throw new Error("listModel is not specified.");
			this.listModel = options.listModel;			
		},
		events: {
			"click #makeItPrettyBtn": "onClickSubmit",
			"click #indentType": "onClickIndentType"
		},
		onClickSubmit: function() {
			var $text = this.$("#txtArea");
			if($text) {
				var txt = $text.val().trim();
				if(txt != '') {
					var indentType = this.model.get("indentType");
					var indent = this.model.get("indents")[indentType];
					var strPrettyXml = MakePrettyXml.pretty(txt, indent);
					var id = this.listModel.nextId;
					var prettyXmlModel = new PrettyXmlModel({id: id, header: "Characters: " + strPrettyXml.length, xml: strPrettyXml})
					this.listModel.add(prettyXmlModel);
					this.listModel.nextId = id+1;
					$text.val("");
				}
			}
		},
		onClickIndentType: function() {
			var indentType = this.$("#indentType").children('input:checked').val();
			this.model.set("indentType", indentType);
		},		
		render: function() {
			var template = _.template($("#entryAreaTemplate").html());
			var html = template(this.model.toJSON());
			this.$el.append(html);
			return this;
		},
	});
	
    return EntryAreaView;
});