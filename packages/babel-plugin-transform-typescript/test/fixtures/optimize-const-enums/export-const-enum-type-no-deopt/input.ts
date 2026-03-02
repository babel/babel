const enum WhitespaceFlag {
  before = 1 << 0,
  after = 1 << 1,
}

export type { WhitespaceFlag as WF1 };
export { type WhitespaceFlag as WF2 };

export const before = WhitespaceFlag.before;
