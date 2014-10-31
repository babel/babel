function t1({responseText: responseText}) {
}
function t2({responseText}) {
}
function t3([a, b]) {
}
var [i, j, k] = array;
var {i, j, k} = obj;
let {i, j, k} = obj;
const {i, j, k} = obj;
var {
    value
} = obj;
var {
    value
} = obj;
var [obj.hello] = prop;
var [obj.hello, ...obj.ok] = prop;
var [obj.hello, ...obj['hello']] = prop;
