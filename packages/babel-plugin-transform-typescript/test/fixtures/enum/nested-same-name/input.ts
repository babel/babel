enum Status { Ok = 200, A = 100 }

function make() {
  const Ok = "local";
  enum Status { Msg = Ok, A = 1, B = Status.A + 1 }
  return Status;
}

{
  const Ok = 5;
  enum Status { Twice = Ok * 2 }
}

enum Later { X = Status.A }
