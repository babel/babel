export type * from './mod';
export type * as ns from './mod';
// Note: TSC doesn't support string module specifiers yet,
// but it's easier for us to support it that not.
export type * as "ns2" from './mod';

;
