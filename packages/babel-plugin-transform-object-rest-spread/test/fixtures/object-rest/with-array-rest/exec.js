// The empty function body returns the rest parameter so it can be checked.
let {
  a: [b, ...arrayRest],
  c = function(...functionRest){ return functionRest; },
  ...objectRest
} = {
  a: [1, 2, 3, 4],
  d: "oyez"
};

expect(b).toBe(1);
expect(arrayRest).toEqual([2, 3, 4]);
expect(typeof c).toBe("function");
expect(c.name).toBe("c");
expect(c.length).toBe(0);
expect(c(5, 6)).toEqual([5, 6]);
expect(objectRest).toEqual({ d: "oyez" });
