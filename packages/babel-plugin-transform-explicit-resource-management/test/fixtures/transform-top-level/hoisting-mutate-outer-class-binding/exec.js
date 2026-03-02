export class A { static get self() { return A } }

using x = null;

export class B { static get self() { return B } }

const AO = A, BO = B;
A = B = null;

expect(AO.self).toBe(AO);
expect(BO.self).toBe(BO);
