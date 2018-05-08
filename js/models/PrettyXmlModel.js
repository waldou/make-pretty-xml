define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

	var PrettyXmlModel = Backbone.Model.extend({
		defaults: {
			header: ""
		},
		initialize: function() {
			console.log("Initializing new PrettyXmlModel...");
		},
		validate: function(attrs) {
			if(!attrs.xml) {
				return "XML String is not present...";
			}
		}
	});
	
    return PrettyXmlModel;
});