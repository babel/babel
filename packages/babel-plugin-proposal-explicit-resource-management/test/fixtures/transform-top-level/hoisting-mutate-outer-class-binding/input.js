export class A { static self = A }

using x = null;

export class B { static self = B }

A = B = null;
