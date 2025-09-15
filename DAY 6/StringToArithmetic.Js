// Convert string to arithmetic operation
// For example accept a string like "10 + 20"
// and return output as 30
// b. "20 - 10" //Output 10
// Only string input is allowed which you have to parse and get a number output
// eval is not allowed

function parseArithmetic(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return (
            console.error("Error: Invalid input. Must be a non-empty string.")
        );
    }

    let left = "", right = "", operator = "";
    let i = 0;

    while (i < str.length && str[i] === ' ') i++;

    while (i < str.length && str[i] >= '0' && str[i] <= '9') {
        left += str[i];
        i++;
    }

    while (i < str.length && str[i] === ' ') i++;

    if (str[i] === '+' || str[i] === '-') {
        operator = str[i];
        i++;
    } else {
        return (
            console.error("Error: Operator must be + or -")
        );
    }

    while (i < str.length && str[i] === ' ') i++;

    while (i < str.length && str[i] >= '0' && str[i] <= '9') {
        right += str[i];
        i++;
    }

    function toNumber(s) {
        let num = 0;
        for (let j = 0; j < s.length; j++) {
            let code = s.charCodeAt(j);
            if (code < 48 || code > 57) return NaN;
            num = num * 10 + (code - 48);
        }
        return num;
    }

    let a = toNumber(left);
    let b = toNumber(right);

    return operator === '+' ? a + b : a - b;
}

console.log(parseArithmetic("10 + 20"));
console.log(parseArithmetic("20 - 10"));