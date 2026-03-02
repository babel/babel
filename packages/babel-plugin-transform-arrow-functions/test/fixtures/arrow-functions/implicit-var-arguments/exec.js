var arguments = [1, 2, 3];
var arr = () => arguments[0];

expect(arr()).toStrictEqual(1)

function foo(n) {
var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
return f();
}
 
expect(foo(3)).toStrictEqual(6)