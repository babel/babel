const wait = t => new Promise(r => setTimeout(r, t));

function pluginC({ types: t }) {
  return {
    pre() {
      this.file.metadata.executionOrder = ['pluginC'];
    },
  };
}

function pluginB({ types: t }) {
  return {
    inherits: pluginC,
    async pre() {
      await wait(50);
      this.file.metadata.executionOrder.push('pluginB');
    },
  };
}

module.exports = function pluginA({ types: t }) {
  return {
    inherits: pluginB,
    async pre() {
      await wait(50);
      this.file.metadata.executionOrder.push('pluginA');
    },

    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral(this.file.metadata.executionOrder.toString()));
      },
    },
  };
};
