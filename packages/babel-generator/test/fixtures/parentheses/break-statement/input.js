label1: for (const a of [1, 2, 3]) {
  break /*Block comment written in single line */ label1;
}

label2: for (const a of [1, 2, 3]) {
  break /*Block comment written
  in multiple lines */ label2;
}

label2: for (const a of [1, 2, 3]) {
  break //foo
    label2;
}
