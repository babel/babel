let _case = input,
    _rest,
    _rest2,
    _rest3,
    _length,
    _restLength;

if (Array.isArray(_case) && _case[0] === 1 && _case[1] === 2 && (_rest = _case.slice(2))) console.log('rest: ', rest);else if (Array.isArray(_case) && _case[0] === 1 && _case[1] === 2 && _case[2] === 3 && (_rest2 = _case.slice(3), _rest2 !== undefined && _rest2 !== null && (_length = _rest2.length, typeof _length !== "undefined"))) console.log('length of rest', _length);else if (Array.isArray(_case) && _case[0] === 1 && _case[1] === 2 && _case[2] === 3 && (_rest3 = _case.slice(3), _rest3 !== undefined && _rest3 !== null && (_restLength = _rest3.length, typeof _restLength !== "undefined"))) console.log('length of rest', _restLength);
