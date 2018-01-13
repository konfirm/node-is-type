/* global source, describe, it, expect */

const Type = source('type');

describe('README examples', () => {
	it('proves "Usage"', (next) => {
		expect(Type.isString('foo')).to.be.true();
		expect(Type.isString(Infinity)).to.be.false();

		expect(Type.isNumber('foo')).to.be.false();
		expect(Type.isNumber(Infinity)).to.be.true();

		next();
	});

	it('proves "API"', (next) => {
		expect(Type.isObject('foo')).to.be.false();
		expect(Type.isObject(null)).to.be.false();

		expect(Type.isNULL(null)).to.be.true();
		expect(Type.isNull(null)).to.be.true();

		class One {}
		class Two extends One {}
		class Three extends Two {}

		const three = new Three();
		expect(Type.isThree(three)).to.be.true();
		expect(Type.isTwo(three)).to.be.true();
		expect(Type.isOne(three)).to.be.true();

		next();
	});
});
