function fibb(n) {
  if (!Number.isInteger(n) || n < 0 || n > 1000) {
    throw new Error("n должно быть целым неотрицательным числом и не больше 1000");
  }
  if (n === 0) return 0n;
  if (n === 1) return 1n;
  let a = 0n;
  let b = 1n;
  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b; 
}