let result;
class C {
  static #p = "#p";
  static a = "a";
  static "0" = "string-zero";
  static 0 = "numeric-zero-updated";
  static 1 = "one";
  static 2n = "two-bigint";
  static 3 = "three";
  static b = "b";
  
  static {
    // Test 1: identifier duplicates
    var { a, #p: p, a: x, ...r1 } = C;
    result = { test1: { a, p, x, r1 } };
    
    // Test 2: string literal "0" and numeric literal 0 are the same key
    var { "0": y, #p: p2, 0: z, ...r2 } = C;
    result.test2 = { y, p2, z, r2 };
    
    // Test 3: numeric literal duplicates
    var { 1: m, #p: p3, 1: n, ...r3 } = C;
    result.test3 = { m, p3, n, r3 };
    
    // Test 4: bigint literal duplicates
    var { 2n: s, #p: p4, 2n: t, ...r4 } = C;
    result.test4 = { s, p4, t, r4 };
    
    // Test 5: mixed literals - rest should not include any extracted keys
    var { "0": v1, 1: v2, 2n: v3, #p: p5, ...r5 } = C;
    result.test5 = { v1, v2, v3, p5, r5 };
  }
}

// Test 1: Identifier duplicates
expect(result.test1).toStrictEqual({
  a: "a",
  p: "#p", 
  x: "a",
  r1: {
    "0": "numeric-zero-updated",
    "1": "one",
    "2": "two-bigint",
    "3": "three",
    b: "b"
  }
});

// Test 2: String and numeric literal with same key "0"
expect(result.test2).toStrictEqual({
  y: "numeric-zero-updated",
  p2: "#p",
  z: "numeric-zero-updated",
  r2: {
    "1": "one",
    "2": "two-bigint",
    "3": "three",
    a: "a",
    b: "b"
  }
});

// Test 3: Numeric literal duplicates
expect(result.test3).toStrictEqual({
  m: "one",
  p3: "#p",
  n: "one",
  r3: {
    "0": "numeric-zero-updated",
    "2": "two-bigint",
    "3": "three",
    a: "a",
    b: "b"
  }
});

// Test 4: BigInt literal duplicates
expect(result.test4).toStrictEqual({
  s: "two-bigint",
  p4: "#p",
  t: "two-bigint",
  r4: {
    "0": "numeric-zero-updated",
    "1": "one",
    "3": "three",
    a: "a",
    b: "b"
  }
});

// Test 5: Mixed literals
expect(result.test5).toStrictEqual({
  v1: "numeric-zero-updated",
  v2: "one",
  v3: "two-bigint",
  p5: "#p",
  r5: {
    "3": "three",
    a: "a",
    b: "b"
  }
});