class A {
  #x;
  method() {
    var _obj, _obj2, _obj3, _obj4, _obj5, _obj6;
    (_obj = obj) === null || _obj === void 0 || (_obj.#x = 1);
    (_obj2 = obj) === null || _obj2 === void 0 || (_obj2.#x += 2);
    (_obj3 = obj) === null || _obj3 === void 0 || (_obj3.#x ??= 3);
    (_obj4 = obj) === null || _obj4 === void 0 || (_obj4.#x.y = 4);
    (_obj5 = obj) === null || _obj5 === void 0 || (_obj5.#x.y += 5);
    (_obj6 = obj) === null || _obj6 === void 0 || (_obj6.#x.y ??= 6);
  }
}
