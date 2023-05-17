async function f() {
  {
    /*0*/for /*1*/ ( /*2*/await using /*4*/b /*3*/ /*5*/ of /*6*/x /*7*/) /*8*/;
  }
  {
    /*0*/for /*1*/ /*2*/ await ( /*3*/await using /*5*/b /*4*/ /*6*/ of /*7*/x /*8*/) /*9*/;
  }
}