let _case = input,
    name,
    firstName,
    x,
    name,
    age,
    number,
    type,
    b;
if (Object.is(_case) && (_name = _case.name, Object.is(_name) && (_firstName = _name.firstName, typeof _firstName !== "undefined")) && (_x = _case.age, typeof _x !== "undefined")) console.log('object ', _firstName, _x);else if (Object.is(_case) && (_name2 = _case.name, _name2 === "Chen") && (_age = _case.age, _age === 3) && (_number = _case.number, Array.isArray(_number) && _number[0] === 1 && _number[1] === 2 && _number[2] === 3)) console.log('object');else if (Array.isArray(_case) && _case[0] === 1 && Object.is(_case[1]) && (_type = _case[1].type, _type === 3) && (_b = _case[2], typeof _b !== "undefined")) console.log('array', _b);
