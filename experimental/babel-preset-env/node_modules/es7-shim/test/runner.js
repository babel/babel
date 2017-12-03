var Promise = require('es6-promise').Promise;
var spawn = require('child_process').spawn;

module.exports = function (method, module) {
	console.log(method + ': running tests from "' + module + '"...');
	return new Promise(function (resolve, reject) {
		spawn('npm', ['explore', module, 'npm install && npm test'], { stdio: 'inherit' })
			.on('error', reject)
			.on('close', function (code) {
				(code === 0 ? resolve : reject)(code);
			});
	}).then(function (code) {
		console.log(method + ': tests passed!');
	}).catch(function (error) {
		console.error('Error running tests for ' + method, error);
	});
};
