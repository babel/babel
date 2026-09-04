const seen: string[] = [];

const lib = {
  zComponent: () => {
    seen.push("class");
    return (target: unknown) => target;
  },
  zUI: () => (_value: unknown, context: { name: string | symbol }) => {
    seen.push(String(context.name));
  },
  zObserve: (fn: unknown) => (_value: unknown, context: { name: string | symbol }) => {
    seen.push(String(context.name));
  },
};

@lib.zComponent()
class Example {
  untouched: string;

  @lib.zUI()
  @lib.zObserve((v: number, _instance: Example) => v)
  target = 2;
}

new Example();

expect(seen).toEqual(["class", "target", "target"]);
