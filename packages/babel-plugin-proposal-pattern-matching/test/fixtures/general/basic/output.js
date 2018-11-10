let _case = input,
    _x,
    _a,
    _b,
    _y;

if (Object.is(_case) && (_x = _case.x, typeof _x !== "undefined")) console.log('object: ', _x);else if (Array.isArray(_case) && _case[0] === 1 && (_a = _case[1], typeof _a !== "undefined") && (_b = _case[2], typeof _b !== "undefined")) console.log('array: ', _a, _b);else if (true) console.log('everything');else if (_y = _case, true) console.log('equal to input: ', input, _y);
