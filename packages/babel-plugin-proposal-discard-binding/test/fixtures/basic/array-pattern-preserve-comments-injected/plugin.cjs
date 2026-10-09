/**
 *
 * @param {import("@babel/core").PluginAPI} api
 * @returns {import("@babel/core").PluginObject}
 */
module.exports = function(api) {
  const actionsList = [
    [{
      type: 'leading',
      value: 'injected 0'
    }],
    [{
      type: 'trailing',
      value: 'injected 1'
    }],
    [{
      type: 'leading',
      value: 'injected 0'
    }, {
      type: 'trailing',
      value: 'injected 1'
    }],
    [{
      type: 'leading',
      value: 'injected 1'
    }, {
      type: 'trailing',
      value: 'injected 3'
    }]
  ];
  const { types: t } = api;
  /**
   * @type {import("@babel/core").PluginObject}
   */
  const plugin = {
    name: 'babel-plugin-proposal-discard-binding-test-array-pattern-preserve-comments-injected',
    visitor: {
      Program(path) {
        path.traverse({
          VoidPattern(path) {
            const actions = actionsList.shift();
            if (!actions) {
              throw new Error('No more actions left');
            }
            actions.forEach(action => {
              t.addComments(
                path.node, action.type,
                [{ type: "CommentBlock", value: action.value }]
              );
            });
          }
        });
      },
    }
  };
  return plugin;
};
