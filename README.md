# IsType

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53284b31271e4050a66ad0974f1b2e03)](https://www.codacy.com/app/konfirm/node-is-type?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=konfirm/node-is-type&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/konfirm/node-is-type.svg?branch=master)](https://travis-ci.org/konfirm/node-is-type)

Simple Object type/name checks

## Getting started

### Installation

```
$ npm install --save @konfirm/is-type
```

### Usage
As the type library as a scoped package, the scope is also need when the library is used.

```js
const Type = require('@konfirm/is-type');

console.log(Type.isString('foo'));     //  true
console.log(Type.isString(Infinity));  //  false

console.log(Type.isNumber('foo'));     //  false
console.log(Type.isNumber(Infinity));  //  true
```

## API
The `IsType` library provides the same API as the [`Type`](https://github.com/konfirm/node-type) library, with the addition of `is*` type checks for _any_ type of detectable object/built-in type.

### `is*`
Detect any type using its name right after `is`, for example `isObject` or `isMyCustomObject`.
It takes the prototype chain into consideration for objects, except for the built-in simple types (`String`, `Number`, `Boolean`) and `null` values, which are not considered to be objects by `IsType`.

```js
const Type = require('@konfirm/is-type');

console.log(Type.isObject('foo')); //  false
console.log(Type.isObject(null));  //  false

console.log(Type.isNULL(null));    //  true (in case you dislike isNull)
console.log(Type.isNull(null));    //  true (in case you dislike isNULL)

class One {}
class Two extends One {}
class Three extends Two {}

const three = new Three();
console.log(Type.isThree(three));  //  true
console.log(Type.isTwo(three));    //  true
console.log(Type.isOne(three));    //  true
```

### Inherited methods

- [`functionName(value)`](https://github.com/konfirm/node-type#string-functionnamevalue)
- [`getTypeName(value [, real = true])`](https://github.com/konfirm/node-type#string-gettypenamevalue--real--true)
- [`instanceOf(type, value)`](https://github.com/konfirm/node-type#boolean-instanceoftype-value)
- [`is(type, value)`](https://github.com/konfirm/node-type#boolean-istype-value)
- [`objectName(value)`](https://github.com/konfirm/node-type#string-objectnamevalue)


## Licence

MIT License

Copyright (c) 2018 Konfirm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
