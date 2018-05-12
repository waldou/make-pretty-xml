define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
		PrettyXmlModel = require('models/prettyxml');

	var PrettyXmlsModel = Backbone.Collection.extend({
		model: PrettyXmlModel,
		initialize: function() {
			console.log("Initializing new PrettyXmlsModel...");
			this.nextId = 1;
		},
		add: function(item) {
			item.set("id", this.nextId++);
			Backbone.Collection.prototype.add.call(this, item);
		}
	});
	
    return PrettyXmlsModel;
});