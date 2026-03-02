function recordEarlyExit(title, result) {
  switch (title) {
    case 'ForStatement#init#Variable': {
      for (let i = 1, z = do { return result; }; i < 2; i++) {
        result.push(i);
      }
      break;
    }
    case 'ForStatement#init#Assignment': {
      let i, z;
      for (i = 1, z = do { return result; }; i < 2; i++) {
        result.push(i);
      }
      break;
    }
    case 'ForStatement#test': {
      for (let i = 1; i < do { return result; }; i++) {
        result.push(i);
      }
      break;
    }
    case 'ForStatement#update': {
      for (let i = 1; i < 2; i++, do { return result; }) {
        result.push(i);
      }
      break;
    }
    case 'ForInStatement#right#Variable': {
      for (const key in do { return result; }) {
        result.push(key);
      }
      break;
    }
    case 'ForInStatement#right#Assignment': {
      let key;
      for (key in do { return result; }) {
        result.push(key);
      }
      break;
    }
    case 'ForInStatement#left#Variable#PatternInitializer': {
      for (const { z = do { return result; } } in [0, 1]) {
        result.push(z);
      }
      break;
    }
    case 'ForInStatement#left#Variable#PatternComputedKey': {
      for (const { [do { return result; }]: z  } in [0, 1]) {
        result.push(z);
      }
      break;
    }
    case 'ForInStatement#left#Assignment#PatternInitializer': {
      let z;
      for ({ z = do { return result; } } in [0, 1]) {
        result.push(z);
      }
      break;
    }
    case 'ForInStatement#left#Assignment#PatternComputedKey': {
      let z;
      for ({ [do { return result; }]: z } in [0, 1]) {
        result.push(z);
      }
      break;
    }
    case 'ForOfStatement#right#Variable': {
      for (const value of do { return result; }) {
        result.push(value);
      }
      break;
    }
    case 'ForOfStatement#right#Assignment': {
      let value;
      for (value of do { return result; }) {
        result.push(value);
      }
      break;
    }
    case 'WhileStatement': {
      let i = 1;
      while (i < do { return result; }) {
        result.push(i);
        i++;
      }
      break;
    }
    case 'DoWhileStatement': {
      let j = 1;
      do {
        result.push(j);
        j++;
      } while (j < do { return result; });
      break;
    }
    default:
      throw new Error(`Unsupported test title: ${title}`);
  }
}

expect(recordEarlyExit('ForStatement#init#Variable', [])).toEqual([]);
expect(recordEarlyExit('ForStatement#init#Assignment', [])).toEqual([]);
expect(recordEarlyExit('ForStatement#test', [])).toEqual([]);
expect(recordEarlyExit('ForStatement#update', [])).toEqual([1]);
expect(recordEarlyExit('ForInStatement#right#Variable', [])).toEqual([]);
expect(recordEarlyExit('ForInStatement#right#Assignment', [])).toEqual([]);
// todo: this is not supported yet
// expect(recordEarlyExit('ForInStatement#left#Variable#PatternInitializer', [])).toEqual([]);
// todo: this is not supported yet
// expect(recordEarlyExit('ForInStatement#left#Variable#PatternComputedKey', [])).toEqual([]);
// todo: this is not supported yet
// expect(recordEarlyExit('ForInStatement#left#Assignment#PatternInitializer', [])).toEqual([]);
// todo: this is not supported yet
// expect(recordEarlyExit('ForInStatement#left#Assignment#PatternComputedKey', [])).toEqual([]);
expect(recordEarlyExit('ForOfStatement#right#Variable', [])).toEqual([]);
expect(recordEarlyExit('ForOfStatement#right#Assignment', [])).toEqual([]);
expect(recordEarlyExit('WhileStatement', [])).toEqual([]);
expect(recordEarlyExit('DoWhileStatement', [])).toEqual([1]);
