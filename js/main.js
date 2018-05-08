require.config({
    waitSeconds: 100,
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery.min',
        'underscore': '../node_modules/underscore/underscore-min',
        'backbone': '../node_modules/backbone/backbone-min',
		'myapp': 'app',
		'makeprettyxml': 'makeprettyxml',		
		'models/entryarea': 'models/EntryAreaModel',
		'models/prettyxml': 'models/PrettyXmlModel',
		'models/prettyxmls': 'models/PrettyXmlsModel',
		'views/entryarea': 'views/EntryAreaView',
		'views/prettyxml': 'views/PrettyXmlView',
		'views/prettyxmls': 'views/PrettyXmlsView'
    }
});

require(['myapp', 'jquery'], function (App, $) {
	App.init();
});