const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors()); 
const primeNumbers = (num) => {
    if (num < 2) return false; 
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false; 
    }
    return true; 
  };
primeNumbers(2);

const armstrong = (num) => {
  let numStr = num.toString();
  let numLen = numStr.length;
  let sum = 0;
  for (let i = 0; i < numLen; i++) {
    let digit = parseInt(numStr[i]);
    sum += Math.pow(digit, numLen);
  }

  if (sum === num) {
    console.log(`armsrong: ${num}`);
    return true;
  } else {
    console.log("armstrong is not true");
    return false;
  }
};
armstrong(153);

const isOdd = (num) => (num % 2 !== 0 ? true : false);
isOdd(3);
const properties = (num) => {
  if (armstrong(num) === true && isOdd(num) === true) {
    return ["armstrong", "odd"];
  } else if (armstrong(num) === true && isOdd(num) === false) {
    return ["armstrong", "even"];
  } else if (isOdd(num) === false) {
    return ["even"];
  } else if (isOdd(num) === true) {
    return ["odd"];
  }
};
properties(11);

const sumOfDigit = (num) => {
  const numStr = num.toString();
  let sum = 0;
  for (let i = 0; i < numStr.length; i++) {
    let digit = parseInt(numStr[i]);
    sum += digit;
  }
  return sum;
};
sumOfDigit(1234);
const isPerfect = (num) => {
    if (num < 2) return false;
    let sum = 1;  
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        sum += i;
        if (i !== num / i) sum += num / i; 
      }
    }
    return sum === num;
  };
  isPerfect(28)
const funFact = async (num) => {
  try {
    const response = await fetch(`http://numbersapi.com/${num}?json`);
    const data = await response.json();
    console.log(`Fun Fact: ${data.text}`);

    return data.text;
  } catch (error) {
    console.error("Error fetching fun fact:", error);
    return "No fun fact available."; 
  }
};
funFact(42); // Example usage

app.get("/api/classify-number", async (req, res) => {
  try {
    const numString = req.query.number;

    if (!numString || isNaN(numString) || numString.includes(" ")) {
      return res.status(400).json({
        number: numString,
        error: true,
      });
    }

    const num = Number(numString);

    const fun_fact = await funFact(num);

    res.json({
      number: num,
      is_prime: primeNumbers(num),
      is_perfect: isPerfect(num),
      properties: properties(num),
      digit_sum: sumOfDigit(num),
      fun_fact: fun_fact,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(PORT, () => {
  console.log(
    `your server is currently running on port, http://localhost:${PORT}/api/classify-number`
  );
});