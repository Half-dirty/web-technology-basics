function cesar(str, shift, action) {
  var lowerAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  var upperAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  var alphabetLength = lowerAlphabet.length;
  var s = shift % alphabetLength;
  if (s < 0) {
    s = s + alphabetLength;
  }
  if (action === "decode") {
    s = (alphabetLength - s) % alphabetLength;
  } else if (action !== "encode") {
    throw new Error("action должно быть 'encode' или 'decode'");
  }
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var ch = str[i];
    var index = -1;
    var isUpper = false;
    for (var j = 0; j < alphabetLength; j++) {
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
      var newIndex = (index + s) % alphabetLength;
      if (isUpper) {
        result += upperAlphabet[newIndex];
      } else {
        result += lowerAlphabet[newIndex];
      }
    }
  }
  return result;
}

// var dec = cesar("эзтыхз фзъзъз", 8, "decode"); -> "хакуна матата"
// Расшифрованное сообщение: "хакуна матата"
