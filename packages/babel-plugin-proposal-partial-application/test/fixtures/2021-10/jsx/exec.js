let calls = 0;
const h = (type, props) => ({ type, props });
h.Fragment = "fragment";
const g = () => ++calls;
const pair = (a, b) => [a, b];

// JSX elements are evaluated once, when partially applied
const p = pair~(<div x={g()} />, ?);
expect(calls).toBe(1);
const [first] = p(1);
const [second] = p(2);
expect(first).toBe(second);
expect(first.props.x).toBe(1);
expect(calls).toBe(1);

const fragment = pair~(<></>, ?);
expect(fragment(1)[0]).toBe(fragment(2)[0]);
