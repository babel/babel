function b() {
  var t = x => this.x + x;
}

class Foo extends (function(){}) {
  constructor(){
    var foo = () => this;

    if (true){
        console.log(super(), foo());
    } else {
        super();
        console.log(foo());
    }
  }
}
