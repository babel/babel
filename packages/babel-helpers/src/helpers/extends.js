/* @minVersion 7.0.0-beta.0 */

export default function _extends() {
  _extends = Object.assign
    ? // need a bind because https://github.com/babel/babel/issues/14527
      Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

  return _extends.apply(this, arguments);
}
