
let secret = Object.create(null);

class A {
	m1() {
		return secret;
	}
}

{// anon class
	let v = new class extends A {
		static sMethod() {
			// can't call this method
		}
	};

	console.log(v.m1() === secret);
}

{// anon class2
	let secret2 = Object.create(null);

	let Class = (class extends A {
		static sMethod() {
			return secret2;
		}
	});
	let v = new Class;

	console.log(v.m1() === secret, Class.sMethod() === secret2);
}

{// anon class extends anon class
	let secret2 = Object.create(null);

	let Class = (class extends class A {
		m1() {
			return secret;
		}
	} {
		static sMethod() {
			return secret2;
		}
	});
	let v = new Class;

	console.log(v.m1() === secret, Class.sMethod() === secret2);
}

{// anon class extends null
	let secret2 = Object.create(null);

	let Class = (class extends null {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2);
}

{// anon class extends arrow function (group)
	let secret2 = Object.create(null);

	let Class = (class extends (()=>(1)) {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2);
}

{// anon class extends function
	let secret2 = Object.create(null);

	let Class = (class extends function(){} {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2);
}

{// anon class extends function (call expression - result class)
	let secret2 = Object.create(null);

	let Class = (class extends (function(){ return class {
		m1() {
			return secret;
		}
	}})() {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2);
}

{// anon class extends function (call expression - result arrow function)
	let secret2 = Object.create(null);

	let Class = (class extends (function(){ return (()=>(1)) })() {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2);
}

{// anon class extends function (expression - result class)
	let secret2 = Object.create(null);

	let A;
	let Class = (class extends ( A = class {
		m1() {
			return secret;
		}
	}) {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2, (new A).m1() === secret);
}

{// anon class extends function (expression - result arrow function)
	let secret2 = Object.create(null);

	let A;
	let Class = (class extends ( A = (()=>secret) ) {
		static sMethod() {
			return secret2;
		}
		test() {
			return Class.sMethod();
		}
	});
	let v = new Class;

	console.log(Class.sMethod() === secret2, v.test() === secret2, A() === secret);
}

{// named class
	let secret2 = Object.create(null);

	let v = new class B extends A {
		static sMethod() {
			return secret2;
		}
		test() {
			return B.sMethod();
		}
	};

	console.log(v.m1() === secret, v.test() === secret2);
}


{// named class 2
	let secret2 = Object.create(null);

	let Class = (class B extends A {
		static sMethod() {
			return secret2;
		}
		test() {
			return B.sMethod();
		}
	});
	let v = new Class;

	console.log(v.m1() === secret, Class.sMethod() === secret2, v.test() === secret2);
}
