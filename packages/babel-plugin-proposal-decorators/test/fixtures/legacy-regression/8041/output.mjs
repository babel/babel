var _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; desc.writable = !!desc.writable; desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

let _class = (_class2 = class {
  bar() {}

}, (_applyDecoratedDescriptor(_class2.prototype, "bar", [foo], Object.getOwnPropertyDescriptor(_class2.prototype, "bar"), _class2.prototype)), _class2);

export { _class as default };
