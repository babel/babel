const log = [];
const logger = {
  name: "default",
  log(msg) {
    return `${this.name}: ${msg}`;
  },
};
const getLogger = () => (log.push("receiver"), logger);
const logIt = getLogger()[(log.push("key"), "log")]~((log.push("arg"), "hi"));
expect(log).toEqual(["receiver", "key", "arg"]);
expect(logIt()).toBe("default: hi");
expect(logger.log~(?)("hello")).toBe("default: hello");

// The receiver and the method are fixed
let o = { v: 1, f() { return this.v; } };
const g = o.f~();
o.f = () => 2;
o = { v: 3 };
expect(g()).toBe(1);

class A {
  #v = 4;
  #get() { return this.#v; }
  partial() { return this.#get~(); }
}
expect(new A().partial()()).toBe(4);
