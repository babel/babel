const seen = [];
const lib = {
  dec: () => (_, context) => {
    seen.push(context.name);
  },
};

@lib.dec()
class Example {
  untouched: string;

  @lib.dec(() => Example) target = 2;
}

new Example();

expect(seen).toEqual(["target", "Example"]);
