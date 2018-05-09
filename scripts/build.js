var shelljs = require('shelljs');
var fs = require('fs-extra');
var compressor = require('node-minify');
var getFiles = function (dir, extensions) {
    var files = [],
	readDir = function (dir) {
		var list = fs.readdirSync(dir);
		list.forEach(function (file) {
			var stat;
			file = dir + '/' + file;
			stat = fs.statSync(file)
			if (stat && stat.isDirectory()) {
				if (file.indexOf('bower_components') === -1 && file.indexOf('node_modules') === -1) {
					readDir(file);
				}
			} else if (extensions.test(file)) {
				files.push(file);
			}
		});
	}
    readDir(dir);
    return files;
};

console.log("Creating or cleaning dist folder...")
shelljs.mkdir("dist");
shelljs.rm("-rf", "dist/*");

shelljs.mkdir("dist/css");
var cssFiles = getFiles("css", /(\/\w+\.(css))$/);
for(var i=0; i< cssFiles.length; i++) {
	console.log("Minifying file: " + cssFiles[i]);
	compressor.minify({
	  compressor: 'csso',
	  input: cssFiles[i],
	  output: 'dist/'+cssFiles[i],
	  options: {
		restructureOff: true
	  },
	  callback: function (err, min) {}
	});
}

console.log("Copying js folder...")
shelljs.cp('-R', './js', './dist/');

console.log("Copying node_modules...")
shelljs.mkdir('-p', './dist/node_modules/requirejs/', './dist/node_modules/jquery/dist/',
	'./dist/node_modules/underscore/', './dist/node_modules/backbone/', './dist/node_modules/normalize.css/');
shelljs.cp('-Rf', './node_modules/requirejs/require.js', './dist/node_modules/requirejs/require.js');
shelljs.cp('-Rf', './node_modules/jquery/dist/jquery.min.js', './dist/node_modules/jquery/dist/jquery.min.js');
shelljs.cp('-Rf', './node_modules/underscore/underscore-min.js', './dist/node_modules/underscore/underscore-min.js');
shelljs.cp('-Rf', './node_modules/backbone/backbone-min.js', './dist/node_modules/backbone/backbone-min.js');
shelljs.cp('-Rf', './node_modules/normalize.css/normalize.css', './dist/node_modules/normalize.css/normalize.css');

console.log("Copying static files...")
shelljs.cp('-R', './index.html', './dist/index.html');
shelljs.cp('-R', './favicon.ico', './dist/favicon.ico');

console.log("Done. Check /dist folder...");