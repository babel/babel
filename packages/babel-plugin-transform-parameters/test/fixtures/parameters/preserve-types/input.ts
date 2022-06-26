type Point = {
  x: number;
  y: number;
};

function point({ x, y }: Point) {
  return x * y;
}

