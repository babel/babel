export function lazyLoadOperation () {
  return import('./x')
  .then(function (x) {
    x.y();
  });
}
