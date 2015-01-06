(function (obj) {
  return obj && obj.constructor === Object ? obj : { default: obj };
})
