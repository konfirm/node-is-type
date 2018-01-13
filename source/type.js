const Type = require('@konfirm/type');

const cache = new Map();

/**
 *  Obtain the prototype chain for the given input
 *
 *  @param   {any}    input
 *  @return  {array}  ancestry
 */
function ancestry(input) {
	const proto = input && typeof input === 'object' ? Object.getPrototypeOf(input) : null;

	return proto ? ancestry(proto).concat(proto) : [];
}

/**
 *  Verify whether the given type resides in the prototype chain of the input
 *
 *  @param   {string}   type
 *  @param   {any}      input
 *  @return  {boolean}  type in chain
 */
function typeInAncestry(type, input) {
	return ancestry(input)
		.reduce((carry, obj) => carry || Type.objectName(obj) === type, false);
}

/**
 *  Determine if the given input matches the type
 *
 *  @param   {string}   type
 *  @param   {any}      input
 *  @return  {boolean}  is type
 */
function isType(type, input) {
	if (input === null) {
		return type.toLowerCase() === 'null';
	}

	return typeof input === type.toLowerCase() || Type.is(type, input);
}

/**
 *  Ensure a delegate function exists for the given type and return it
 *
 *  @param   {string}    type
 *  @return  {function}  detector
 */
function cachedTypeDetector(type) {
	if (!cache.has(type)) {
		cache.set(type, (input) => isType(type, input) || typeInAncestry(type, input));
	}

	return cache.get(type);
}

//  Create the Proxy doing the heavy lifting
module.exports = new Proxy({}, {
	get: (...args) => {
		const [ , key] = args;
		const type = (key.match(/^is([A-Z]\w*)$/) || []).slice(1).shift();

		return type ? cachedTypeDetector(type) : Type[key];
	},
});
