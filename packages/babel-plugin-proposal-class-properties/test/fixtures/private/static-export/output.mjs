export class MyClass {}

var _MyClassStatics = Object.create(null);

babelHelpers.defineProperty(_MyClassStatics, "property", value);
export default class MyClass2 {}

var _MyClass2Statics = Object.create(null);

babelHelpers.defineProperty(_MyClass2Statics, "property", value);
