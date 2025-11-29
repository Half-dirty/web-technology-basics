function cesar(str, shift, action) {
  const lowerAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const upperAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  const alphabetLength = lowerAlphabet.length;
  let s = shift % alphabetLength;
  if (s < 0) {
    s = s + alphabetLength;
  }
  if (action === "decode") {
    s = (alphabetLength - s) % alphabetLength;
  } else if (action !== "encode") {
    throw new Error("action должно быть 'encode' или 'decode'");
  }
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    let index = -1;
    let isUpper = false;
    for (let j = 0; j < alphabetLength; j++) {
      if (lowerAlphabet[j] === ch) {
        index = j;
        isUpper = false;
        break;
      }
      if (upperAlphabet[j] === ch) {
        index = j;
        isUpper = true;
        break;
      }
    }
    if (index === -1) {
      result += ch;
    } else {
      const newIndex = (index + s) % alphabetLength;
      if (isUpper) {
        result += upperAlphabet[newIndex];
      } else {
        result += lowerAlphabet[newIndex];
      }
    }
  }
  return result;
}

// const dec = cesar("эзтыхз фзъзъз", 8, "decode"); -> "хакуна матата"
// Расшифрованное сообщение: "хакуна матата"
