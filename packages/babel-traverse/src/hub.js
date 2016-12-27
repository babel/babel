import Scope from "./scope";
export interface HubInterface {
  mark?: (type: string, message: string) => void;
  addHelper?: (name: string) => Object;
  getScope?: () => Scope;
  getCode?: () => string;
  buildError:(node: Object, msg: string, Error: Error) => Error;
}

export default class Hub {
  buildError(node, msg, BuildError = TypeError): Error {
    return new BuildError(msg);
  }
}
