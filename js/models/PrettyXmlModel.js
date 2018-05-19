define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Moment = require('moment');

	var PrettyXmlModel = Backbone.Model.extend({
		defaults: {
			validationError: "",
			viewType: "0",
			isValidXml: false
		},
		initialize: function() {
			console.log("Initializing new PrettyXmlModel...");
			this.set("timestamp", Moment().format("YYYY-MM-DD HH:mm:ss"));
		},
		validate: function(attrs) {
			if(!attrs.xml)
				return "Pretty XML String is not present!";
			if(!attrs.xmlRaw)
				return "Raw XML String is not present!";
		}
	});
	
    return PrettyXmlModel;
});