import { obj } from "obj";

// `obj` might be reassigned before calling `f`, but the receiver
// must be the value it had when `f` was created.
const f = obj.m(?, 1);
