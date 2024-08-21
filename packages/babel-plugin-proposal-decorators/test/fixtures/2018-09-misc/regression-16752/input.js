@customElement("ha-state-label-badge")
class HaStateLabelBadge extends LitElement {
  clearInterval() {
    if (this._updateRemaining) {
      clearInterval(this._updateRemaining);
      this._updateRemaining = undefined;
    }
  }
}
