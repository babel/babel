class Child extends Parent {

  constructor(){
    var foo = (arg = 1) => super(arg, 2, 3, 4, 5);
    foo();
  }

  params(){
    var fn = () => {
      super.params(a, b, c, d);

      super.params++;
      ++super.params;
      super.params--;
      --super.params;
      super.params += 4;
      super.params /= 4;
      super.params %= 4;

      super[a + b] = c;
    };
    var fn2 = (arg1 = 4) => {
      super.params(a, b, c, d);

      super.params++;
      ++super.params;
      super.params--;
      --super.params;
      super.params += 4;
      super.params /= 4;
      super.params %= 4;

      super[a + b] = c;
    }
  }

  asyncFn(){
    var fn = () => {
      super.params(a, b, c, d);

      super.params++;
      ++super.params;
      super.params--;
      --super.params;
      super.params += 4;
      super.params /= 4;
      super.params %= 4;

      super[a + b] = c;
    };
    var fn2 = async () => {
      super.params(a, b, c, d);

      super.params++;
      ++super.params;
      super.params--;
      --super.params;
      super.params += 4;
      super.params /= 4;
      super.params %= 4;

      super[a + b] = c;
    }
  }


}
