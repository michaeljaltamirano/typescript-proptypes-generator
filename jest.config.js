// const { jsWithTs: tsjPreset } = require('ts-jest/presets')
// const { jsWithTsESM: tsjPreset } = require('ts-jest/presets')
// const { jsWithBabel: tsjPreset } = require('ts-jest/presets')
const { jsWithBabelESM: tsjPreset } = require('ts-jest/presets')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	testRegex: `test/index.test.ts`,
	testTimeout: 1000,
	transform: {
		...tsjPreset.transform,
	}
};
