loop:
for (var i = 0; i < 10; i++) {
  const z = 3; // force loop function
  () => z;
  switch(true) {
    case true:
      break loop;
  }
}

