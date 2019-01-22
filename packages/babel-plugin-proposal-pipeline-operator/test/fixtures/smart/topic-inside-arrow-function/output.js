const _pipe = -2.2 // -2.2
;

const _pipe2 = Math.floor(_pipe) // -3
;

const _pipe3 = () => Math.pow(_pipe2, 5) // () => -243
;

const _pipe4 = _pipe3() // -243
;

const result = Math.sign(_pipe4); // -1
