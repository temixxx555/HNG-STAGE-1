const express = require("express");
const app = express();
const PORT = process.env.port || 3000;

const primeNumbers = (num) => {
  if (num < 2) {
    console.log("wrong number");

    return;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      console.log(`not prime number ${num}`);

      return false;
    }
  }

  console.log(`prime number is ${num}`);
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
    console.log(`armsrong ${num}`);
    return true;
  } else console.log("armstrong is not true");
};
armstrong(153);

const isOdd = (num) => (num % 2 !== 0 ? true : false);
isOdd(3);
const properties = (num) => {
  if (armstrong(num) === true && isOdd(num) === true) {
    return "armstrong and odd";
  } else if (armstrong(num) === true && isOdd(num) === false) {
    return "armstrong and even";
  } else if (isOdd(num) === false) {
    return "even";
  } else if (isOdd(num) === true) {
    return "odd";
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
  console.log(sum);
  return sum;
};
sumOfDigit(1234);

const funFact = async (num) => {
  try {
    const response = await fetch(`http://numbersapi.com/${num}?json`);
    const data = await response.json();
    console.log(`Fun Fact: ${data.text}`);

    return data.text;
  } catch (error) {
    console.error("Error fetching fun fact:", error);
  }
};
funFact(42); // Example usage

app.get("/api/classify-number", async (req, res) => {
  try {
    const numString = req.query.num; 

    if (!numString || isNaN(numString) || numString.includes(" ")) {
      return res.status(400).json({
        number: "alphabet",
        error: true,
      });
    }

    const num = Number(numString); 

    const fun_fact = await funFact(num);

    res.json({
      number: num,
      is_prime: primeNumbers(num),
      is_perfect: armstrong(num),
      properties: [properties(num)],
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
