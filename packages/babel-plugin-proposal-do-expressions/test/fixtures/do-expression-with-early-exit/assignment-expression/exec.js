function recordEarlyExit(title, result) {
  switch (title) {
    case 'AssignmentExpression#Left#MemberExpression#ComputedKey': {
      result[do { return result; }] = 42;
      break;
    }

    case 'AssignmentPattern#Left#ComputedKey': {
      const { [do { return result; }]: z = 42 } = result;
      result.push(z);
      break;
    }

    case 'AssignmentPattern#Left#ComputedKey#WithoutInitializer': {
      const { [do { return result; }]: z } = result;
      result.push(z);
      break;
    }

    case 'AssignmentPattern#Left#PatternInitializer': {
      const [ z = do { return result; } ] = result;
      result.push(z);
      break;
    }

    case 'AssignmentPattern#Left#PatternInitializer#DoEmpty': {
      const [ z = do {} + do { return result; } ] = result;
      result.push(z);
      break;
    }

    case 'AssignmentPattern#Left#PatternInitializer#WithHole': {
      const [ , z = do { return result; } ] = result;
      result.push(z);
      break;
    }

    case 'AssignmentPattern#Left#PatternInitializer#WithIdentifier': {
      const [ x, z = do { return result; } ] = result;
      result.push(z);
      break;
    }

    case 'AssignmentPattern#Left#PatternInitializer#WithRestElement': {
      const [ z = do { return result; }, ...x ] = result;
      result.push(z, ...x);
      break;
    }

    case 'RestElement#Argument#PatternInitializer': {
      const [ ...[z = do { return result; }, ...x ] ] = result;
      result.push(z, ...x);
      break;
    }

    case 'OptionalMemberExpression#ComputedKey': {
      result.push(result?.[do { return result; }]);
      break;
    }

    case 'OptionalCallExpression#ComputedKey': {
      result.push(result?.[do { return result; }]());
      break;
    }

    case 'UnaryExpression#Argument': {
      result.push(!result[do { return result; }]);
      break;
    }

    case 'LogicalExpression#Left#operator||': {
      result[do { return result; }] || (result[0] = 42);
      break;
    }

    case 'LogicalExpression#Left#operator&&': {
      result[undefined] = 42;
      result[do { return result; }] && (result[0] = 42);
      break;
    }

    case 'LogicalExpression#Left#operator??': {
      result[do { return result; }] ?? (result[0] = 42);
      break;
    }

    case 'ConditionalExpression#Test': {
      result[do { return result; }] ? (result[0] = 42) : (result[1] = 42);
      break;
    }

    case 'ConditionalExpression#Alternate': {
      Object.keys(result).length > 0 ? (result[0] = 42) : (result[do { return result; }] = 42);
      break;
    }

    case 'ConditionalExpression#Consequent': {
      Object.keys(result).length === 0 ? (result[do { return result; }] = 42) : (result[0] = 42);
      break;
    }

    default:
      throw new Error(`Unsupported test title: ${title}`);
  }
  // This return should not be reached.
  return NaN;
}

expect(recordEarlyExit('AssignmentExpression#Left#MemberExpression#ComputedKey', {})).toEqual({});
// These cases are not supported.
// expect(recordEarlyExit('AssignmentPattern#Left#ComputedKey', [])).toEqual([]);
// expect(recordEarlyExit('AssignmentPattern#Left#ComputedKey#WithoutInitializer', [])).toEqual([]);
expect(recordEarlyExit('AssignmentPattern#Left#PatternInitializer', [])).toEqual([]);
expect(recordEarlyExit('AssignmentPattern#Left#PatternInitializer#DoEmpty', [])).toEqual([]);
expect(recordEarlyExit('AssignmentPattern#Left#PatternInitializer#WithHole', [])).toEqual([]);
expect(recordEarlyExit('AssignmentPattern#Left#PatternInitializer#WithIdentifier', [])).toEqual([]);
expect(recordEarlyExit('AssignmentPattern#Left#PatternInitializer#WithRestElement', [])).toEqual([]);
expect(recordEarlyExit('RestElement#Argument#PatternInitializer', [])).toEqual([]);
expect(recordEarlyExit('OptionalCallExpression#ComputedKey', [])).toEqual([]);
expect(recordEarlyExit('OptionalMemberExpression#ComputedKey', [])).toEqual([]);
expect(recordEarlyExit('LogicalExpression#Left#operator||', {})).toEqual({});
expect(recordEarlyExit('LogicalExpression#Left#operator&&', {})).toEqual({ undefined: 42 });
expect(recordEarlyExit('LogicalExpression#Left#operator??', {})).toEqual({});
expect(recordEarlyExit('UnaryExpression#Argument', [])).toEqual([]);
expect(recordEarlyExit('ConditionalExpression#Test', [])).toEqual([]);
expect(recordEarlyExit('ConditionalExpression#Alternate', {})).toEqual({});
expect(recordEarlyExit('ConditionalExpression#Consequent', {})).toEqual({});
