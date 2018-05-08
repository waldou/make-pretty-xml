define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
		EntryAreaModel = require('models/entryarea'),
		EntryAreaView = require('views/entryarea'),
		PrettyXmlsModel = require('models/prettyxmls'),
		PrettyXmlsView = require('views/prettyxmls');

	var init = function() {
		console.log("Initializing app...");
		
		// Xmls List
		var prettyXmlsModel = new PrettyXmlsModel();
		var prettyXmlsView = new PrettyXmlsView({el: '#prettyXmlsContainer', model: prettyXmlsModel});
		prettyXmlsView.render();
		
		// Entry area
		var entryAreaModel = new EntryAreaModel();
		var entryAreaView = new EntryAreaView({ el: '#entryAreaContainer', model: entryAreaModel, listModel: prettyXmlsModel});
		entryAreaView.render();
	}
	
    return {
        init: init
    };
});