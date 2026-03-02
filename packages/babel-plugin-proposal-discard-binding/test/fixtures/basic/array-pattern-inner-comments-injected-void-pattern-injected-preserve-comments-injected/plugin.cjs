/**
 *
 * @param {import("@babel/core").PluginAPI} api
 * @returns {import("@babel/core").PluginObject}
 */
module.exports = function(api) {
  const spliceIndexAndActionsList = [
    [0, [{
      type: 'leading',
      value: 'injected 0'
    }], undefined],
    [0, [{
      type: 'trailing',
      value: 'injected 1'
    }], undefined],
    [0, [{
      type: 'leading',
      value: 'injected 0'
    }, {
      type: 'trailing',
      value: 'injected 1'
    }], undefined],
    [1, [{
      type: 'leading',
      value: 'injected 1'
    }, {
      type: 'trailing',
      value: 'injected 2'
    }], [{
      type: 'inner',
      value: 'injected 0'
    }]]
  ];
  const { types: t } = api;
  /**
   * @type {import("@babel/core").PluginObject}
   */
  const plugin = {
    name: 'babel-plugin-proposal-discard-binding-test-array-pattern-inner-comments-injected-void-pattern-injected-preserve-comments-injected',
    visitor: {
      Program(path) {
        path.traverse({
          ArrayPattern(path) {
            const [spliceIndex, actions, arrayPatternActions = []] = spliceIndexAndActionsList.shift();
            const voidPattern = t.voidPattern();
            actions.forEach(action => {
              t.addComments(
                voidPattern, action.type,
                [{ type: "CommentBlock", value: action.value }]
              );
            });
            arrayPatternActions.forEach(action => {
              t.addComments(
                path.node, action.type,
                [{ type: "CommentBlock", value: action.value }]
              );
            });
            path.node.elements.splice(spliceIndex, 0, voidPattern);
          }
        });
      },
    }
  };
  return plugin;
};
