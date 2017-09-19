function _asyncToGenerator(fn) { return function (...args) { return new Promise((resolve, reject) => { const gen = fn.apply(this, args); function step(key, arg) { let info; try { info = gen[key](arg); } catch (error) { reject(error); return; } if (info.done) { resolve(info.value); } else { Promise.resolve(info.value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

export default {
  function(name) {
    return _asyncToGenerator(function* () {
      const uppercasedName = name.upperCase(); // awaits depending on uppercasedName go here

      return <Foo name={uppercasedName} />;
    })();
  }

};
