
function match_1_2_rest(input) {
  case (input) {
    when [1, 2, ...rest] -> return rest;
  }
  return false;
}

expect(match_1_2_rest([1, 2, 3, 4])).toEqual([3, 4]);
expect(match_1_2_rest([1, 2, 3])).toEqual([3]);
expect(match_1_2_rest([1, 2])).toEqual([]);
expect(match_1_2_rest([1])).toBe(false);
expect(match_1_2_rest([])).toBe(false);

expect(match_1_2_rest([2, 1, 3, 4])).toBe(false);
expect(match_1_2_rest([2, 1])).toBe(false);
expect(match_1_2_rest(null)).toBe(false);
expect(match_1_2_rest(undefined)).toBe(false);
expect(match_1_2_rest(1)).toBe(false);
expect(match_1_2_rest({0: 1, 1: 2})).toBe(false);


function match_1_length(input) {
  case (input) {
    when [1, ...{ length }] -> return length;
  }
  return false;
}

expect(match_1_length([1, 22, 333])).toBe(2);
expect(match_1_length([1])).toBe(0);
expect(match_1_length([])).toBe(false);


function match_1_restlength(input) {
  case (input) {
    when [1, ...{ length: restLength }] -> return restLength;
  }
  return false;
}

expect(match_1_restlength([1, 22, 333])).toBe(2);
expect(match_1_restlength([1])).toBe(0);
expect(match_1_restlength([])).toBe(false);
