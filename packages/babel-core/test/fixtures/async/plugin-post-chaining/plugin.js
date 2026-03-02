const wait = t => new Promise(r => setTimeout(r, t));

function pluginC({ types: t }) {
  return {
    async post() {
      await wait(50);
      this.file.ast.program.body[0].value = 'pluginC'
    },
  };
}

function pluginB({ types: t }) {
  return {
    inherits: pluginC,
     post() {
      this.file.ast.program.body[0].value += ',pluginB';
    },
  };
}

module.exports = function pluginA({ types: t }) {
  return {
    inherits: pluginB,
    async post() {
      await wait(50);
      this.file.ast.program.body[0].value += ',pluginA';
    },

    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral('failure'));
      },
    },
  };
};
