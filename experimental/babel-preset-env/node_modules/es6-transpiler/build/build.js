"use strict";

const es6transpiler = require('./../es6-transpiler')
	, path = require('path')
	, fs = require('fs')
	, _package = require('../package.json')
	, BUILD_VERSION = _package.version
	, targetDir = path.join(__dirname, 'es5')
	, srcDir = path.join(__dirname, '..')
	, projectDit = path.join(__dirname, '..')
//	, devDependencies = Object.keys(_package["devDependencies"])
	, depsMap = {}
;

// test
//fs.writeFileSync = function(fileName) {
//	console.log('writeFileSync::', fileName)
//}

// for build.js in prepare mode
const NODE_MODULES_ROOT = path.basename(path.join(__dirname, '..', '..')) === "npm" ? path.join(__dirname, '..', '..', '..') : "";

console.log('Beginning ' + _package.name + '(version ' + BUILD_VERSION + ') build');

let filesMap = {};
function prepareFile(files, description, fullPath) {
	let isFolder = !!description.folder;
	let isFile = false;
	let fileOrDir = description.file || description.folder || description.filename;

	let extname = path.extname(fileOrDir);
	let fullFileName = !!(description.filename || extname);
	let fileName = fullPath === true ? fileOrDir : path.join(srcDir, fileOrDir);
	let outputFileName = fullPath === true ? path.join(targetDir, path.relative(srcDir, fileOrDir)) : path.join(targetDir, fileOrDir);

	if ( !isFolder && fs.existsSync(fullFileName ? fileName : fileName + ".js") ) {
		fileName = fullFileName ? fileName : fileName + ".js";
		outputFileName = fullFileName ? outputFileName : outputFileName + ".js";
		isFile = true;
		extname = path.extname(fileName);
	}

	if ( isFile ) {
		let copyOnly = description.copyOnly || extname !== '.js';

		if ( filesMap[fileName] === void 0 ) {
			filesMap[fileName] = null;//each file only once. Example: core.js & core folder

			files.push({
				src: fileName
				, dest: outputFileName
				, copyOnly: copyOnly
				, version: description.version
				, require: description.require
			});
		}
	}
	else if ( fs.existsSync(fileName) ) {
		if ( !fs.existsSync(outputFileName) ) {
		    console.log('make a', outputFileName)
		    fs.mkdirSync(outputFileName);
		}

		let stat = fs.statSync(fileName);
		if ( stat && stat.isDirectory() && description.doNotScanFolders !== true ) {
			fs.readdirSync(fileName).forEach(function(file) {
				prepareFile(files, {file: path.join(fileName, file), doNotScanFolders: description.noRecursive, require: description.require}, true);
			});
		}
	}

	return files;
}

[
	{file: 'es6-transpiler', version: true}//, require: devDependencies}
	, {file: 'options'}

	, {file: 'run-tests', copyOnly: true}//filename 'run-tests.js'
	, {filename: 'run-tests.es6.js'}//filename 'run-tests.es6.js'
	, {filename: 'run-tests', copyOnly: true}//filename 'run-tests'

	, {file: 'es6toes5', copyOnly: true}//filename 'es6toes5.js'
	, {filename: 'es6toes5', copyOnly: true}//filename 'es6toes5'

	, {folder: 'transpiler', noRecursive: true}//, require: devDependencies}
	, {folder: 'transpiler/extensions', noRecursive: true}
	, {file: 'transpiler/core/comments'}
	, {file: 'transpiler/core/is'}
	, {file: 'transpiler/core/standardVars'}
	, {folder: 'polyfills/test'}

	, {file: 'polyfills/RegExp', require: true}
//	, {file: 'polyfills/Symbol', require: true}

	, {file: 'jshint_globals/vars', copyOnly: true}

	, {file: 'lib/error'}
	, {file: 'lib/esprima_harmony', copyOnly: true}
	, {file: 'lib/node_inject'}
	, {file: 'lib/regjsparser', copyOnly: true}
	, {file: 'lib/scope'}
	, {file: 'lib/stats'}
	, {file: 'lib/tmpl'}

].reduce(prepareFile, []).forEach(function(file) {
	let srcFilename = file.src;
	let outputFilename = file.dest;

	if ( file.copyOnly === true ) {
		console.log('copy ' + path.relative(projectDit, srcFilename) + '\t-> ' + path.relative(projectDit, outputFilename));

		fs.writeFileSync(outputFilename, fs.readFileSync(srcFilename));
	}
	else {
		console.log('compile ' + path.relative(projectDit, srcFilename) + '\t-> ' + path.relative(projectDit, outputFilename));

		let fileContent = String(fs.readFileSync(srcFilename));

		if ( file.version === true ) {
			fileContent = fileContent.replace("%%BUILD_VERSION%%", BUILD_VERSION);
		}

		if ( file.require ) {
			let type = file.require === true
				? ['.*?']
				: Array.isArray(file.require)
					? file.require
					: [file.require + ""]
			;
			fileContent = inlineDeps(fileContent, path.dirname(srcFilename), type);
		}


		let res = es6transpiler.run({src: fileContent});

		if ( res.errors && res.errors.length ) {
			console.error.apply(console.error, ['ERRORS in file "' + path.relative(projectDit, srcFilename) + '":: \n   '].concat(res.errors, ['\n']));
			return;
		}

		fileContent = res.src;
		fs.writeFileSync(outputFilename, fileContent);
	}
});

console.log("done build");

function loadNodeModuleContent(dep) {
	let content = null;
	const nodeModulesDir = path.join(NODE_MODULES_ROOT, '../node_modules/');

	fs.readdirSync(nodeModulesDir).some(function(folder) {
		if ( folder.charAt(0) === '.' )return false;

		folder = path.join(nodeModulesDir, folder);

		if ( fs.statSync(folder).isDirectory() ) {
			let _package = require(path.join(folder, 'package.json'));

			if ( _package["name"] == dep ) {
				let main = _package["main"];

				if ( main ) {
					main = path.join(folder, main);

					if ( fs.existsSync(main) ) {
						content = "var module = {exports: {}};" + String(fs.readFileSync(main)) + ";return module.exports";
					}
				}

				return true;
			}
		}
	});

	return content;
}

function loadFileContent(dep, basePath) {
	let content = "var module = {exports: {}};" + String(fs.readFileSync(path.join(basePath, dep))) + "\n;return module.exports";
	return content;
}

function loadDepContent(dep, basePath) {
	if ( depsMap[dep] !== void 0 )return depsMap[dep];

	const isNodeModule = dep[0] !== '.' && dep[0] !== '//' && /^\w/.test(dep);

	let content = isNodeModule ? loadNodeModuleContent(dep) : loadFileContent(dep, basePath);

	depsMap[dep] = content;

	return depsMap[dep];
}

function inlineDeps(content, basePath, depsForFind) {
	depsForFind.forEach(function(dep) {
		const re = new RegExp('require\\([\'"](' + dep + ')[\'"]\\)', 'g');
		let i = 0, uid = "_" + (Math.random() * 1e9 | 0) + Date.now(), tail = "";

		content = content.replace(re, function(found, dep) {
			let content = loadDepContent(dep, basePath);

			if ( content ) {
				let funcName = uid + "_" + ++i + "_require_" + dep.replace(/[.\\\/\-=+*&^%#@!'"?`~()|\[\]{}]/g, "_");

				tail += ("\n;function " + funcName + "(){" + content + "};");

				content = funcName + "()";

				console.log(" injecting ", dep, '->', funcName);
			}

			return content ? content : found;
		});

		content = content + tail;
	});
	return content;
}
