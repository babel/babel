class Child extends Parent {

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
