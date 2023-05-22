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
