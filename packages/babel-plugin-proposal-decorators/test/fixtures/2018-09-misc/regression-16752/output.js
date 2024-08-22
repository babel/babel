let HaStateLabelBadge = babelHelpers.decorate([customElement("ha-state-label-badge")], function (_initialize, _LitElement) {
  "use strict";

  class HaStateLabelBadge extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: HaStateLabelBadge,
    d: [{
      kind: "method",
      key: "clearInterval",
      value: function (_clearInterval) {
        function clearInterval() {
          return _clearInterval.apply(this, arguments);
        }
        clearInterval.toString = function () {
          return _clearInterval.toString();
        };
        return clearInterval;
      }(function () {
        if (this._updateRemaining) {
          clearInterval(this._updateRemaining);
          this._updateRemaining = undefined;
        }
      })
    }]
  };
}, LitElement);
