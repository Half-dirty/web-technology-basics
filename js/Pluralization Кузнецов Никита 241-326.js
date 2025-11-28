function pluralizeRecords(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n должно быть целым неотрицательным числом");
  }
  const lastTwo = n % 100; 
  const last = n % 10;    
  let word;
  if (lastTwo >= 11 && lastTwo <= 14) {
    word = "записей";
  } else if (last === 1) {
    word = "запись";
  } else if (last >= 2 && last <= 4) {
    word = "записи";
  } else {
    word = "записей";
  }
  return `В результате выполнения запроса было найдено ${n} ${word}`;
}