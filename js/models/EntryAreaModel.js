define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

	var EntryAreaModel = Backbone.Model.extend({
		defaults: {
			indentType: 0,
			indents: ["  ", "	"]
		},
		initialize: function() {
			console.log("Initializing new EntryAreaModel...");
		}
	});
	
    return EntryAreaModel;
});