// https://github.com/google/traceur-compiler/issues/478

function f() {
  (1 ? ({a=0}) => {} : 1);
}
