// Options: --async-functions
// Error: :6:1: Unexpected token =>

var async = () => 1;
var x = async (y)
=> y;
