class Point {
    #x;
    #y;

    constructor(x = 0, y = 0) {
        this.#x = +x;
        this.#y = +y;
    }

    get x() { return this.#x }
    set x(value) { this.#x = +value }

    get y() { return this.#y }
    set y(value) { this.#y = +value }

    equals(p) { return this.#x === p.#x && this.#y === p.#y }

    toString() { return `Point<${ this.#x },${ this.#y }>` }

}

const p1 = new Point(1, 2);
const p2 = new Point(2, 3);
const p3 = new Point(1, 2);

assert.equal(p1.x, 1);
assert.equal(p1.y, 2);
assert.equal(p2.x, 2);
assert.equal(p2.y, 3);
assert.equal(p3.x, 1);
assert.equal(p3.y, 2);

assert.isTrue(p1.equals(p1))
assert.isFalse(p1.equals(p2))
assert.isTrue(p1.equals(p3))
assert.isFalse(p2.equals(p1))
assert.isTrue(p2.equals(p2))
assert.isFalse(p2.equals(p3))
assert.isTrue(p3.equals(p1))
assert.isFalse(p3.equals(p2))
assert.isTrue(p3.equals(p3))

assert.equal(p1.toString(), "Point<1,2>")
assert.equal(p2.toString(), "Point<2,3>")
assert.equal(p3.toString(), "Point<1,2>")

p1.x += 1;
p1.y = 3;
p2.x -= 1;
p2.y = 3;
p3.x = 0;
p3.y = 0;

assert.equal(p1.x, 2);
assert.equal(p1.y, 3);
assert.equal(p2.x, 1);
assert.equal(p2.y, 3);
assert.equal(p3.x, 0);
assert.equal(p3.y, 0);

assert.isTrue(p1.equals(p1))
assert.isFalse(p1.equals(p2))
assert.isFalse(p1.equals(p3))
assert.isFalse(p2.equals(p1))
assert.isTrue(p2.equals(p2))
assert.isFalse(p2.equals(p3))
assert.isFalse(p3.equals(p1))
assert.isFalse(p3.equals(p2))
assert.isTrue(p3.equals(p3))

assert.equal(p1.toString(), "Point<2,3>")
assert.equal(p2.toString(), "Point<1,3>")
assert.equal(p3.toString(), "Point<0,0>")
