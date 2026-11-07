var _obj, _key, _obj2, _key2, _obj3, _key3, _getObject, _obj4;
(_obj = obj)[_key = ++key] || (_obj[_key] = 1);
(_obj2 = obj)[_key2 = ++key] && (_obj2[_key2] = 1);
(_obj3 = obj)[_key3 = ++key] ?? (_obj3[_key3] = 1);
(_getObject = getObject()).x || (_getObject.x = 1);
(_obj4 = obj).x || (_obj4.x = 1);
