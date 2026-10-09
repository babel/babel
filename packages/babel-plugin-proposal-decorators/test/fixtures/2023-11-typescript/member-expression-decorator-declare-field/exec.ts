const seen = [];
const lib = {
  dec: () => (_, context) => {
    seen.push(context.name);
  },
};

class Example {
  declare untouched: string;

  @lib.dec(() => Example) target = 2;
}

new Example();

expect(seen).toEqual(["target"]);
