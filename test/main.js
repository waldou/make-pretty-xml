require.config({
    baseUrl: '../',  // to set the default folder
    paths: {
        'jasmine': ['./node_modules/jasmine-core/lib/jasmine-core/jasmine'],
        'jasmine-html': ['./node_modules/jasmine-core/lib/jasmine-core/jasmine-html'],
        'jasmine-boot': ['./node_modules/jasmine-core/lib/jasmine-core/boot'],
        
        'jquery': './node_modules/jquery/dist/jquery.min',
        'underscore': './node_modules/underscore/underscore-min',
        'backbone': './node_modules/backbone/backbone-min',
        'moment': './node_modules/moment/min/moment.min',

        'makeprettyxml': './js/makeprettyxml',
        'validatexml': './js/validatexml',
        'models/entryarea': './js/models/EntryAreaModel',
        'models/prettyxml': './js/models/PrettyXmlModel',
        'models/prettyxmls': './js/models/PrettyXmlsModel',
        'views/entryarea': './js/views/EntryAreaView',
        'views/prettyxml': './js/views/PrettyXmlView',
        'views/prettyxmls': './js/views/PrettyXmlsView'
    },
    shim: {
      'jasmine-html': {
        deps : ['jasmine']
      },
      'jasmine-boot': {
        deps : ['jasmine', 'jasmine-html']
      }
    }
});

require(['jasmine-boot'], function () {
  require([
    'js/makeprettyxml.spec',
    'js/validatexml.spec',

    'js/models/EntryAreaModel.spec',
    'js/models/PrettyXmlModel.spec',
    'js/models/PrettyXmlsModel.spec',

    'js/views/PrettyXmlsView.spec',
  ], function(){
    //trigger Jasmine
    window.onload();
  })
});