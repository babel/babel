let log = [];
function disposable() { log.push('call') }
disposable[Symbol.dispose || Symbol.for("Symbol.dispose")] = () => { log.push('dispose') };

{
  using x = disposable;
  x();
}

expect(log).toEqual(['call', 'dispose']);
