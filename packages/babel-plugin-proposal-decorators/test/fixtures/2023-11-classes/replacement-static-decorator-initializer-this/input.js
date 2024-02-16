
let original, replaced, accessorThis, getterThis, setterThis, methodThis, propertyThis;

function dec(Klass) {
  original = Klass;
  replaced = class extends Klass {};

  return replaced;
}

function captureInitializerThis(callback) {
  return function (_, context) {
    context.addInitializer(function () {
      callback(this);
    })
  }
}

@dec
class Foo {
  @(captureInitializerThis(v => accessorThis = v))
  static accessor accessor;
  @(captureInitializerThis(v => getterThis = v))
  static get getter() {};
  @(captureInitializerThis(v => setterThis = v))
  static set setter(_) {};
  @(captureInitializerThis(v => methodThis = v))
  static method() {}
  @(captureInitializerThis(v => propertyThis = v))
  static property;
}
