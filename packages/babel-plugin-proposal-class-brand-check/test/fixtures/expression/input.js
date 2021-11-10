
class Range {
    #start
    #end
    constructor(start, end) {
        this.#start = start
        this.#end = end
    }
    equals(range) {
        if (!(class.hasInstance(range))) return false
        return this.#start === range.#start && this.#end === range.#end
    }
}
