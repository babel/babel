class F {
  m() {
    #w in this;
    #x in this;
    #y in this;
    #z in this;
  }
  get #w() {}
  #x = 0;
  #y = (() => {
    throw 'error';
  })();
  #z() {}
}
