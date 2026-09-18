const lib = {
  zUI: () => (_value: unknown, context: { name: string | symbol }) => {
    seen.push(String(context.name));
  },
  zObserve: (fn: unknown) => (_value: unknown, context: { name: string | symbol }) => {
    seen.push(String(context.name));
  },
};

const seen: string[] = [];

class Example {
  untouched: string;

  @lib.zUI()
  @lib.zObserve((value: number, instance: Example) => value)
  target = 2;
}

new Example();

expect(seen).toEqual(["target", "target"]);
