class Point {
    #x;
    #y;

    constructor(x = 0, y = 0) {
        #x = +x;
        #y = +y;
    }

    get x() { return #x }
    set x(value) { #x = +value }

    get y() { return #y }
    set y(value) { #y = +value }

    equals(p) { return #x === p.#x && #y === p.#y }

    toString() { return `Point<${ #x },${ #y }>` }
}
