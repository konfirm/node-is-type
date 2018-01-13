/* global source, describe, it, expect */

const Original = require('@konfirm/type');
const Type = source('type');

describe('non-"is*" invocation', () => {
	Object.getOwnPropertyNames(Original)
		.filter((name) => Type.isFunction(Original[name]))
		.sort((one, two) => Number(two < one) - 1 || Number(two < one))
		.forEach((name) => {
			it(`relays "${ name }"`, (next) => {
				expect(Type[name]).to.shallow.equal(Original[name]);

				next();
			});
		});
});
