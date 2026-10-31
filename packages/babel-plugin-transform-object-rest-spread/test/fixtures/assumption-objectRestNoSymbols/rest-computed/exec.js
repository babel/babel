var a = 1;
var obj = { 1: "one", 2: "two", other: "o" };
Object.defineProperty(obj, "hidden", { value: "h", enumerable: false });

let { [a]: b, ...c } = obj;

expect(b).toBe("one");
expect(c).toEqual({ 2: "two", other: "o" });
expect(Object.keys(c)).toEqual(["2", "other"]);
expect(c).not.toBe(obj);
expect(obj).toEqual({ 1: "one", 2: "two", other: "o" });
