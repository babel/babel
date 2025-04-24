export class A { static self = A }

using x = null;

export class B { static self = B }

const AO = A, BO = B;
A = B = null;

expect(AO.self).toBe(AO);
expect(BO.self).toBe(BO);
