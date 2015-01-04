// Options: --async-functions
// Error: :7:5: Semi-colon expected
// Error: :7:5: Unexpected token =>

var async = () => 1;
var x = async
(y) => y;
