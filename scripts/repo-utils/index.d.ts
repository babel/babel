export const USE_ESM: boolean;
export function commonJS(metaUrl: string): {
  __dirname: string;
  __filename: string;
  require: NodeRequire;
};
export const itNoESM: jest.It;
export const itESM: jest.It;
export function itGteNoESM(version: string): jest.It;
export function itGteESM(version: string): jest.It;
export function itGte(version: string): jest.It;
export function itBabel7GteNoESM(version: string): jest.It;
export const itNoWin32: jest.It;
export const itBabel8: jest.It;
export const itBabel7: jest.It;
export const itBabel7NoESM: jest.It;
export const itDummy: jest.It;
export const describeBabel7: jest.Describe;
export const describeBabel8: jest.Describe;
export function describeGte(version: string): jest.Describe;
