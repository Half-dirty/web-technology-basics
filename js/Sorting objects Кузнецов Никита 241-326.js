function getSortedArray(array, key) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  for (var i = 0; i < result.length - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < result.length; j++) {
      var currentValue = result[j][key];
      var minValue = result[minIndex][key];
      if (currentValue < minValue) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      var temp = result[i];
      result[i] = result[minIndex];
      result[minIndex] = temp;
    }
  }
  return result;
}
