function test() {
  let result = [];
  for (let i = 1; i < 3; i ++) {
    for (let j = 9; j > 7; j --) {
      result.push(i, j, function() { return i + ':' + j; });
    }
  }
}

function test() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 10);
  }
}

function test() {
  let a = 0;

  function other() {
    console.log(a);
  }

  for (let i = 0; i < 10; i++) {
    justDoShit(() => {
      console.log(a++, i);
      other();
    }, 10);
  }
}

function test() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(this, i);
      other();
    }, 10);
  }
}

function test() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(arguments, i);
      other();
    }, 10);
  }
}
