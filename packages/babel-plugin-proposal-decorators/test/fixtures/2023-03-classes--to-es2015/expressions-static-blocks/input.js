const dec = () => {};
const A = @dec class A { static {} }
const B = @dec class C { static {} }
const D = @dec class { static {} }
const E = (@dec class { static {} }, 123);
const F = [@dec class G { static {} }, @dec class { static {} }];
const H = @dec class extends I { static {} };
const J = @dec class K extends L { static {} };

function classFactory() {
  return @dec class { static {} }
}
