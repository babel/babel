let x, y;
{
  a: let x;
  let y;
}

switch (0) {
  case 0: a: let x=0;
}

// it should break from inside of switch statements using labels

loop:
for (var i = 0; i < 10; i++) {
  const z = 3; // force loop function
  () => z;
  switch(true) {
    case true:
      break loop;
  }
}

