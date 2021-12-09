var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
return f();
}
 