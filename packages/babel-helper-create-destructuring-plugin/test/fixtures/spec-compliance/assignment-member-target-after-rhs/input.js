({ a: obj[key()] } = source());
({ a: obj.x = 1 } = source());
({ a: obj.x } = source());
[obj[key()]] = source();
({ a: obj[key()] } = value);
({ a: obj.x } = value);
