const generator = Symbol();
const onDone = Symbol();
const generatorFunction = Symbol();

function schedule(asyncF) {
  return Promise.resolve().then(asyncF);
}

class DecoratedGenerator {
  constructor(_generator, _onDone) {
    this[generator] = _generator;
    this[onDone] = _onDone;
  }

  next(value) {
    var result = this[generator].next();
    if (result.done) {
      this[onDone].call(this);
    }
    return result;
  }

  throw(error) {
    this[onDone].call(this);
    return this[generator].throw(error);
  }

  return(value) {
    this[onDone].call(this);
    return this[generator].return(value);
  }
}


export class AsyncGeneratorFunction {
  constructor(_generatorFunction) {
    this[generatorFunction] = _generatorFunction;
  }

  [Symbol.observer](observer) {
    var generator = this[generatorFunction].call(this);
    var done = false;
    schedule(async function () {
      var result;
      while (!done) {
        try {
          result = generator.next();
        } catch (e) {
          observer.throw(e);
          return;
        }
        if (result.done) {
          observer.return(result.value);
          return;
        }
        try {
          result = observer.next(result.value);
        } catch (e) {
          generator.throw(e);
        }
        if (result.done) {
          generator.return();
          return;
        }
        await result.value;
      }
      generator.return();
    });
    return new DecoratedGenerator(observer, () => { done = true });
  }
}
