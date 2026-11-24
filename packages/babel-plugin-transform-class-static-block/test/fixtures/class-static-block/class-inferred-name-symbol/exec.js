const keys = { desc: Symbol("desc"), empty: Symbol(""), none: Symbol() };

const obj = {
  [keys.desc]: class {
    static {
      this.seen = this.name;
    }
  },
  [keys.empty]: class {
    static {
      this.seen = this.name;
    }
  },
  [keys.none]: class {
    static {
      this.seen = this.name;
    }
  },
};

expect(obj[keys.desc].seen).toBe("[desc]");
expect(obj[keys.empty].seen).toBe("[]");
expect(obj[keys.none].seen).toBe("");
