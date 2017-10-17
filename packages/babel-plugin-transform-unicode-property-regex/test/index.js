import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transform, transformFileSync } from 'babel-core';
import plugin from '../src';

describe('babel-plugin-transform-unicode-property-regex', () => {
	const fixturesDir = path.join(__dirname, 'fixtures');
	fs.readdirSync(fixturesDir).map((caseName) => {
		it(`${caseName.split('-').join(' ')}`, () => {
			const fixtureDir = path.join(fixturesDir, caseName);
			const inputPath = path.join(fixtureDir, 'input.js');
			const actual = transformFileSync(inputPath, {
				'plugins': [
					plugin
				]
			}).code;
			const expected = fs.readFileSync(
				path.join(fixtureDir, 'expected.js')
			).toString();
			assert.equal(actual.trim(), expected.trim());
			// Note: the following causes the plugin to be applied twice, the second
			// time without options, resulting in failing tests. Seems like a bug in
			// babel-core.
			// const actualWithUnicodeFlag = transformFileSync(
			// 	inputPath,
			// 	{
			// 		'plugins': [
			// 			[ plugin, { 'useUnicodeFlag': true } ]
			// 		]
			// 	}
			// ).code;
			// Workaround:
			const actualWithUnicodeFlag = transform(
				fs.readFileSync(inputPath).toString(),
				{
					'plugins': [
						[ plugin, { 'useUnicodeFlag': true } ]
					]
				}
			).code;
			const expectedWithUnicodeFlag = fs.readFileSync(
				path.join(fixtureDir, 'expected-with-unicode-flag.js')
			).toString();
			assert.equal(actualWithUnicodeFlag.trim(), expectedWithUnicodeFlag.trim());
		});
	});
});
