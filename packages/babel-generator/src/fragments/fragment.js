export default class Fragment {
  toString() {
    throw new Error("Not implemented");
  }
}

export class RawFragment extends Fragment {
  constructor(str) {
    super();
    this._raw = str;
  }

  toString() {
    return this._raw;
  }
}
