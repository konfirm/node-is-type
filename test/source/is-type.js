/* global source, describe, it, expect */

const Type = source('type');

class Foo {
	toString() {
		return this.constructor.name;
	}
}
class Bar extends Foo {}

describe('Provides checks on any "is*" invocation', () => {
	const test = [
		{ call: 'isString', expect: true, target: 'foo' },
		{ call: 'isString', expect: false, target: Infinity },
		{ call: 'isString', expect: false, target: null },
		{ call: 'isString', expect: false, target: true },

		{ call: 'isNumber', expect: true, target: Infinity },
		{ call: 'isNumber', expect: false, target: 'foo' },
		{ call: 'isNumber', expect: false, target: null },
		{ call: 'isNumber', expect: false, target: true },

		{ call: 'isBoolean', expect: true, target: true },
		{ call: 'isBoolean', expect: true, target: false },
		{ call: 'isBoolean', expect: false, target: Infinity },
		{ call: 'isBoolean', expect: false, target: 'foo' },
		{ call: 'isBoolean', expect: false, target: null },

		{ call: 'isObject', expect: false, target: 'foo' },
		{ call: 'isObject', expect: false, target: Infinity },
		{ call: 'isObject', expect: false, target: true },
		{ call: 'isObject', expect: false, target: false },
		{ call: 'isObject', expect: false, target: null },

		{ call: 'isNULL', expect: true, target: null },

		{ call: 'isArray', expect: true, target: [ 1, 2, 3 ] },
		{ call: 'isArray', expect: false, target: { a: 1 } },

		{ call: 'isMap', expect: true, target: new Map() },
		{ call: 'isWeakMap', expect: true, target: new WeakMap() },

		{ call: 'isPromise', expect: true, target: new Promise((resolve) => resolve()) },
		{ call: 'isPromise', expect: true, target: Promise.resolve() },

		{ call: 'isError', expect: true, target: new Error('errored') },

		{ call: 'isFoo', expect: true, target: new Foo() },
		{ call: 'isFoo', expect: true, target: new Bar() },
		{ call: 'isObject', expect: true, target: new Foo() },
		{ call: 'isBar', expect: true, target: new Bar() },
		{ call: 'isBar', expect: false, target: new Foo() },
	];

	test.forEach((item) => {
		it(`calls "${ item.call }" on ${ item.target } and verdicts ${ item.expect }`, (next) => {
			expect(Type[item.call](item.target, true)).to.equal(item.expect);

			next();
		});
	});
});
