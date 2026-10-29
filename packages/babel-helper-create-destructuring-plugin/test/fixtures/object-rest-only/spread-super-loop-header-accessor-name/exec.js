// An accessor with a static key keeps its name, and isn't a constructor
let o;
for (let i = 0; o = { ...{}, get p() { return super.x; } }, i < 1; i++);
const { get } = Object.getOwnPropertyDescriptor(o, "p");
expect(get.name).toBe("get p");
expect(get).not.toHaveProperty("prototype");
