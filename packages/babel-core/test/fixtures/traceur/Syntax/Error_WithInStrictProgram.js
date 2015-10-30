// Error: :5:1: Strict mode code may not include a with statement

'use foo';
'use strict';
with ({}) {}
