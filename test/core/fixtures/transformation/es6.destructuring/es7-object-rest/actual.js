var z = {};
var { ...x } = z;
var { x, ...y } = z;
var { [x]: x, ...y } = z;
(function({ x, ...y }) { })
