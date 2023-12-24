/* @minVersion 7.9.0 */

export default function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;

  // core-js@3
  // @ts-expect-error check
  if (Reflect.construct.sham) return false;

  // Proxy can't be polyfilled. Every browser implemented
  // proxies before or at the same time as Reflect.construct,
  // so if they support Proxy they also support Reflect.construct.
  if (typeof Proxy === "function") return true;

  var result = false;

  // Since Reflect.construct can't be properly polyfilled, some
  // implementations (e.g. core-js@2) don't set the correct internal slots.
  // Those polyfills don't allow us to subclass built-ins, so we need to
  // use our fallback implementation.
  try {
    // If the internal slots aren't set, this throws an error similar to
    //   TypeError: this is not a Boolean object.

    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
    result = true;
  } catch (e) {}
  // @ts-expect-error assign to function
  _isNativeReflectConstruct = function () {
    return result;
  };
}
