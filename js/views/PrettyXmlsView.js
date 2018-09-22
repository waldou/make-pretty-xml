define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
		PrettyXmlView = require('views/prettyxml');

	var filterText = "";

	var PrettyXmlsView = Backbone.View.extend({
		initialize: function(options){
			console.log("Initializing new PrettyXmlsView...");
			if (!(options && options.model))
				throw new Error("Model is not specified!");
			this.model.on("add", this.onAddItem, this);
			this.model.on("remove", this.onRemoveItem, this);
			currentList = this.model;
		},
		events: {
			"keyup #filterText": "onKeyUpFilterText"
		},
		onKeyUpFilterText: function(e) {
			var text = this.$("#filterText").val();
			if(text != filterText) {
				filterText = text;
				var validRegexp = false;
				var pattern;
				try {
					pattern = new RegExp(text, "i");
					validRegexp = true;
				} catch(e) { }
				this.$('.prettyXml').each(function(index, item) {
					var rawXml = $(this).find('.prettyXmlTextRaw').text();
					if(validRegexp) {
						pattern.test(rawXml) ? $(this).show('fast') : $(this).hide();
					} else {
						rawXml.toLowerCase().indexOf(text.toLowerCase()) != -1 ? $(this).show('fast') : $(this).hide();
					}
				});
			}
		},
		onAddItem: function(item){
			var view = new PrettyXmlView({ model: item });
			var element = view.render().$el;
			this.$el.find("#itemsContainer").prepend(element);
			element.find(".prettyXml").show("fast", function(){
				$('#mainSearchArea').show('fast');
			});
			console.log("Item " + item.get("id") + " added to list...");
		},
		onRemoveItem: function(item){
			if(this.model.length == 0)
				$('#mainSearchArea').hide();
		},
		render: function() {
			var template = _.template($("#prettyXmlsTemplate").html());
			var html = template(this.model.toJSON());
			this.$el.html(html);
			return this;
		},
	});
	
    return PrettyXmlsView;
});