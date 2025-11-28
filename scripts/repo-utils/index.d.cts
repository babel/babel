export const USE_ESM: boolean;
export const IS_BABEL_8: () => boolean;
export function commonJS(metaUrl: string): {
  __dirname: string;
  __filename: string;
  require: NodeJS.Require;
};
export const repoRoot: string;
export const itNoESM: jest.It;
export const itESM: jest.It;
export function itGte(version: string): jest.It;
export function itLt(version: string): jest.It;
export function itNegate(it: jest.It): jest.It;
export function itSatisfies(version: string): jest.It;
export const itNoWin32: jest.It;
export const itDummy: jest.It;
export function describeGte(version: string): jest.Describe;
export function describeSatisfies(version: string): jest.Describe;
export function describeNoCITGM(version: string): jest.Describe;
