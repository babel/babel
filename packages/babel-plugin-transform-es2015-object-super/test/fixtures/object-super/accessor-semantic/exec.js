class X {
	get x() { return this._x; }
	set x(value) { this._x = value; }
}

class X1 extends X {
  getSuperX() { return super.x; }
	constructor() {
		super();
		this.x = 0;
		super.x = 1;
	}
}

class X2 extends X {
	get x() { return this._x2; }
	set x(value) { this._x2 = value; }
  getSuperX() { return super.x; }
	constructor() {
		super();
		this.x = 0;
		super.x = 1;
	}
}

let x1 = new X1();
assert.equal(x1.x, 1);
assert.equal(x1.getSuperX(), 1);

let x2 = new X2();
assert.equal(x2.x, 0);
assert.equal(x2.getSuperX(), 1);


