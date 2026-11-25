enum Status { Ok = 200, A = 100 }

function make() {
  const Ok = "local";
  enum Status { Msg = Ok, A = 1, B = Status.A + 1 }
  return Status;
}

let blockStatus;
{
  const Ok = 5;
  enum Status { Twice = Ok * 2 }
  blockStatus = Status;
}

enum Later { X = Status.A }

const inner = make();
expect(inner.Msg).toBe("local");
expect(inner.A).toBe(1);
expect(inner.B).toBe(2);
expect(blockStatus.Twice).toBe(10);
expect(Status.Ok).toBe(200);
expect(Status.A).toBe(100);
expect(Later.X).toBe(100);
