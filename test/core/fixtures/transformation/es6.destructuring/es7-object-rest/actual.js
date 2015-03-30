var z = {};
var { ...x } = z;
var { x, ...y } = z;
(function({ x, ...y }) { })
