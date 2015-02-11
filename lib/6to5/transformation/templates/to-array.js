(function (arr) {
  if (Array.isArray(arr)) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) arr2.push(arr[i]);
      return arr2;
  } else {
    return Array.from(arr);
  }
});
