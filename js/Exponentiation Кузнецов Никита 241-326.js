function pow(x, n) {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Степень n должна быть натуральной");
  }
  let result = 1;
  for (let i = 0; i < n; i++) {
    result = result * x;
  }
  return result;
}
