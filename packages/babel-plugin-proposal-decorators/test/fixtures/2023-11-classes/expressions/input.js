const dec = () => {}; 
const A = @dec class A {}
const B = @dec class C {}
const D = @dec class {}
const E = (@dec class {}, 123);
const F = [@dec class G {}, @dec class {}];
const H = @dec class extends I {};
const J = @dec class K extends L {};

function classFactory() {
  return @dec class {}
}
