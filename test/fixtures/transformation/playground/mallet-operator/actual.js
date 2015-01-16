obj ||= {};

obj.x ||= 2;

console.log(obj.x ||= 2);

obj.x.x ||= 2;

console.log(obj.x.x ||= 2);

obj[x()] ||= 2;

console.log(obj[x()] ||= 2);

obj[y()][x()] ||= 2;

console.log(obj[y()][x()] ||= 2);
