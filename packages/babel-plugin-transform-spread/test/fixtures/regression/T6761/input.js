function fn(){}

var args = [1, 2, 3];
var obj = {obj: {fn}};

switch (true){
    case true:
        obj.obj.fn(...args);
        break;
}
