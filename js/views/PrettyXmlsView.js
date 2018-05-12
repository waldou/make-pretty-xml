define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
		PrettyXmlView = require('views/prettyxml');

	var PrettyXmlsView = Backbone.View.extend({
		initialize: function(options){
			console.log("Initializing new PrettyXmlsView...");
			if (!(options && options.model))
				throw new Error("Model is not specified!");
			this.model.on("add", this.onAddItem, this);
		},
		onAddItem: function(item){
			var view = new PrettyXmlView({ model: item });
			var element = view.render().$el;
			this.$el.prepend(element);
			element.find(".prettyXml").show("fast");
			console.log("Item " + item.get("id") + " added to list...");
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