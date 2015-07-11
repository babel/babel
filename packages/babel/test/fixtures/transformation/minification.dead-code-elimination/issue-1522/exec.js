import x from 'y';

x.z = function (a) { return 1 + a; };

assert(x.z(x.value), 43);
