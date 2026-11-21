('use strict');
010;
function f() {
  ('use strict');
  010;
}
function g() {
  'use strict';

  foo;
}
var functionExpression = function () {
  ('a');
};
var arrow = () => {
  ('a');
};
var object = {
  method() {
    ('a');
  }
};
class C {
  method() {
    ('a');
  }
  #privateMethod() {
    ('a');
  }
  static {
    'not a prologue';
  }
}
function afterDirective() {
  'use strict';

  ('a');
}
function onlyFirstNeedsParens() {
  ('a');
  'b';
  'c';
}
function afterEmptyStatement() {
  ;
  'not a prologue';
}
function afterOtherStatement() {
  foo;
  'not a prologue';
}
function firstInPlainBlock() {
  {
    'not a prologue';
  }
}
foo;
'bar';
{
  'plain block';
}