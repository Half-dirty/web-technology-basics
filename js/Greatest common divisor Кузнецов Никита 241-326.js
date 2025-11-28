function gcd(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
    throw new Error("a и b должны быть неотрицательными целыми числами");
  }
  while (b !== 0) {
    const temp = b;
    b = a % b;    
    a = temp;      
  }
  return a;
}