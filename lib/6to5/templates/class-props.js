(function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
})
