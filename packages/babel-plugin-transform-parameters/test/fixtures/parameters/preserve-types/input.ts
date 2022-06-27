type Point = {
  x: number;
  y: number;
};

function value({ x, y }: Point) {
  return x * y;
}

function valueWithDefault({ x, y }: Point = {}) {
  return x * y;
}

