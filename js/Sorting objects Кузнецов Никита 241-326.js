function getSortedArray(array, key) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < result.length; j++) {
      const currentValue = result[j][key];
      const minValue = result[minIndex][key];
      if (currentValue < minValue) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = result[i];
      result[i] = result[minIndex];
      result[minIndex] = temp;
    }
  }
  return result;
}
