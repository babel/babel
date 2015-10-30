// Error: :6:3: Strict mode code may not include a with statement

function testWithInStrict() {
  'use foo';
  'use strict';
  with ({}) {}
}