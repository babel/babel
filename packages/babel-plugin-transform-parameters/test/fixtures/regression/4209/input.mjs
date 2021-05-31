import { copy } from './copyPaste';

class Thing {
  handleCopySomething() {
    copy();
  }

  completelyUnrelated(copy = 123) {
  }
}
