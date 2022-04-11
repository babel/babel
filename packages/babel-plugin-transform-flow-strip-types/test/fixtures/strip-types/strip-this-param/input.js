function one (this : number) {}
function two (this : number, a) {}
function three (this : number, ...a) {}
function four (this : number, a, b, ...c) {}
function five<T> (this : T) {}

type six = (this : number) => void
type seven = { o(this : string) : void }
declare function eight (this : number) : void
declare class Nine { m (this : number) : void }

class Ten {
    m1 (this : number) {}
    m2 (this : number, a) {}
    m3 (this : number, ...a) {}
    m4 (this : number, a, b, ...c) {}
    m5<T> (this : T) {}
}

let eleven = {
    m1 (this : number) {},
    m2 (this : number, a) {},
    m3 (this : number, ...a) {},
    m4 (this : number, a, b, ...c) {},
    m5<T> (this : T) {}
}
