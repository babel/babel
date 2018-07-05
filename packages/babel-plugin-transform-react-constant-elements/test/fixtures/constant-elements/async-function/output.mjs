function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _wrapped() {
  _wrapped = _asyncToGenerator(function* (name) {
    const uppercasedName = name.upperCase(); // awaits depending on uppercasedName go here

    return <Foo name={uppercasedName} />;
  });
  return _wrapped.apply(this, arguments);
}

export default {
  function(_x) {
    return _wrapped.apply(this, arguments);
  }

};
