define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Moment = require('moment');

	var PrettyXmlModel = Backbone.Model.extend({
		defaults: {
			validationError: ""
		},
		initialize: function() {
			console.log("Initializing new PrettyXmlModel...");
			this.set("timestamp", Moment().format("YYYY-MM-DD HH:mm:ss"));
		},
		validate: function(attrs) {
			if(!attrs.xml)
				return "XML String is not present!";
		}
	});
	
    return PrettyXmlModel;
});