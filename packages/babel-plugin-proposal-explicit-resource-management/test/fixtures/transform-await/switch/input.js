async function f() {
  switch (v) {
    case 0:
      await using x = 0;
      break;
    default:
      await using y = 1;
      break;
  }
}
