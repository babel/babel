export default function(left, right) {
  // eslint-disable-next-line no-undef
  if (left instanceof BigInt && right instanceof BigInt) {
    return left.plus(right);
  } else {
    return left + right;
  }
}
