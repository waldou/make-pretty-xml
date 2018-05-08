define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

	var PretyXmlView = Backbone.View.extend({
		initialize: function(options){
			console.log("Initializing new PretyXmlView...");
			if (!(options && options.model))
				throw new Error("Model is not specified.");
			this.model.on("change", this.render, this);
		},
		events: {
			"click #deleteBtn": "onClickDelete",
			"click #downloadBtn": "onClickDownload"
		},
		onClickDelete: function() {
			console.log("Item " + this.model.get("id") + " removed from list...");
			this.model.trigger('destroy', this.model);
			this.$el.hide("fast", function() {
				this.remove();
			});
		},
		onClickDownload: function() {
			var document = this.$el.prop("ownerDocument");
			var text = this.$el.find(".prettyXmlText").text();
			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', "prettyXml" + this.model.get("id") + ".txt");
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		},
		render: function() {
			var template = _.template($("#prettyXmlTemplate").html());
			var html = template(this.model.toJSON());
			$obj = $(html);
			$obj.find(".prettyXmlText").text(this.model.get("xml"));
			this.$el.append($obj.prop('outerHTML'));
			return this;
		},
	});
	
    return PretyXmlView;
});