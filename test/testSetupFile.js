jest.setTimeout(10000);

expect.extend({
  // Usage: expect(actual).toBe(expect.aPrivateName())
  aPrivateName(actual) {
    // We don't have access to the original PrivateName constructor,
    // so we can only rely on duck typing.

    let pass = true;

    pass = pass && actual.constructor.name === "PrivateName";
    pass = pass && actual.__proto__ === actual.constructor.prototype;

    pass = pass && Object.isFrozen(actual);
    pass = pass && Object.isFrozen(actual.__proto__);

    const ownProps = Object.getOwnPropertyNames(actual).sort();
    pass = pass && ownProps.length === 0;

    const protoProps = Object.getOwnPropertyNames(actual.__proto__).sort();

    pass = pass && protoProps[0] === "constructor";
    pass = pass && protoProps[1] === "description";
    pass = pass && protoProps[2] === "get";
    pass = pass && protoProps[3] === "set";
    pass = pass && protoProps[4] === "toString";
    pass = pass && protoProps.length === 5;

    const message = pass
      ? () => `expect ${actual} to be a private name.`
      : () => `expect "PrivateName {}" not to be a private name.`;

    return { message, pass };
  },
});
