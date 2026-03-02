class SS {
  constructor(name){
    this.name = 'ss'+name;
  }
}

class AA extends SS {
  constructor(name){
    super(name);
    this.name = 'aa' +name;
}

aaGreet(s){
  super.greet?.(s + 'hhh');
}
}

const a = new AA('jack');

expect(() => a.aaGreet('d')).not.toThrow();
