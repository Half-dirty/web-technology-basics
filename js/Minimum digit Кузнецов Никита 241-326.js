function minDigit(x) {
  if (!Number.isInteger(x) || x < 0) {
    throw new Error("x должен быть неотрицательным числом");
  }
  if (x === 0) {
    return 0;
  }
  let min = 9;   
  let n = x;    
  while (n > 0) {
    const digit = n % 10;       
    if (digit < min) {
      min = digit;             
    }
    n = (n - digit) / 10;
  }
  return min;
}