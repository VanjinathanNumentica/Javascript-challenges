// Trim Zeros
// --------------
// Remove leading/trailing zeros from a numeric string without losing internal zeros; preserve sign and decimal.
// trimZeros(input, which='both') -> string
// // which: 'leading' | 'trailing' | 'both'


function removeZeros(userInput, mode) {
    if (typeof userInput !== 'string') {
        console.error("Input must be a string.");
        return '';
    }

    const m = mode.toLowerCase();
    if (m !== 'leading' && m !== 'trailing' && m !== 'both') {
        console.error("Mode must be 'leading', 'trailing', or 'both'.");
        return '';
    }

    let sign = '';
    let start = 0;

    const firstChar = userInput.charCodeAt(0);
    if (firstChar === 43 || firstChar === 45) { 
        sign = userInput[0];
        start = 1;
    }

    let decimalIndex = -1;
    for (let i = start; i < userInput.length; i++) {
        if (userInput.charCodeAt(i) === 46) { 
            decimalIndex = i;
            break;
        }
    }

    let intPart = '';
    let fracPart = '';
    for (let i = start; i < userInput.length; i++) {
        const ch = userInput[i];
        if (i < decimalIndex || decimalIndex === -1) {
            intPart += ch;
        } else if (i > decimalIndex) {
            fracPart += ch;
        }
    }

    if (m === 'leading' || m === 'both') {
        let i = 0;
        while (i < intPart.length && intPart[i] === '0') i++;
        let newInt = '';
        for (let j = i; j < intPart.length; j++) {
            newInt += intPart[j];
        }
        intPart = newInt;
    }

    if (m === 'trailing' || m === 'both') {
        let j = fracPart.length - 1;
        while (j >= 0 && fracPart[j] === '0') j--;
        let newFrac = '';
        for (let k = 0; k <= j; k++) {
            newFrac += fracPart[k];
        }
        fracPart = newFrac;
    }

    if (intPart === '') intPart = '0';

    let result = sign + intPart;
    if (decimalIndex !== -1) {
        result += fracPart.length > 0 ? '.' + fracPart : '.0';
    }

    return result;
}
console.log(removeZeros("000123.45000", "leading"));
console.log(removeZeros("000123.45000", "trailing"));
console.log(removeZeros("000123.45000", "both"));
console.log(removeZeros("-000.00100", "both"));
console.log(removeZeros("+0000.000", "both"));
console.log(removeZeros("000.000", "both"));
