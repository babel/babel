import { injcectVirtualStackFrame, expectedError } from "./rewrite-stack-trace";

export default class ConfigError extends Error {
  constructor(message: string, filename?: string) {
    super(message);
    expectedError(this);
    if (filename) injcectVirtualStackFrame(this, filename);
  }
}
