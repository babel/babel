export class A { static get self() { return A } }

using x = null;

export class B { static get self() { return B } }

A = B = null;
