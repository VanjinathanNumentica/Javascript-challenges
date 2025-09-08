// Convert number to strings

// convertNumberToString(98);


function convertNumberToString(num) {
    if (typeof num !== 'number' || num !== num) { 
        console.error("Error: Invalid input");
        return;
    }

    if (num === 0) {
        console.log("Zero");
        return;
    }

    let isNegative = false;
    if (num < 0) {
        isNegative = true;
        num = -num;
    }

    num = num - (num % 1);

    let digits = [];
    while (num > 0) {
        let digit = num % 10;
        digits[digits.length] = digit; 
        num = (num - digit) / 10; 
    }

    let reversedDigits = [];
    for (let i = digits.length - 1; i >= 0; i--) {
        reversedDigits[reversedDigits.length] = digits[i];
    }

    let words = "";
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = reversedDigits[i];
        if (digit === 0) words += "Zero";
        else if (digit === 1) words += "One";
        else if (digit === 2) words += "Two";
        else if (digit === 3) words += "Three";
        else if (digit === 4) words += "Four";
        else if (digit === 5) words += "Five";
        else if (digit === 6) words += "Six";
        else if (digit === 7) words += "Seven";
        else if (digit === 8) words += "Eight";
        else if (digit === 9) words += "Nine";

        if (i !== reversedDigits.length - 1) {
            words += " ";
        }
    }

    if (isNegative) {
        words = "Minus " + words;
    }

    console.log(words);
}

convertNumberToString(98);