let x = 0;

let fnA = x++ |> (() => ^);
let fnB = x++ |> (0, () => ^);

expect(x).toBe(2);
expect(fnA()).toBe(0);
expect(fnB()).toBe(1);
expect(x).toBe(2);
