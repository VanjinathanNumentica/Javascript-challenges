// Implement a function to reverse rotate the characters in a string by a given number of positions.
// For example:
// reverseRotate("unar", 2)   // "arun"
// reverseRotate("llohe", 3)  // "hello"

function reverseRotate(str, shift) {
    if (typeof str !== 'string' || typeof shift !== 'number') {
        console.error("Invalid input: first argument must be a string, second must be a number.");
        return '';
    }

    const len = str.length;
    if (len === 0) return '';

    // Normalize shift to within bounds
    let offset = shift % len;
    if (offset < 0) offset += len;

    // Reverse rotation = left shift by offset
    let result = '';
    for (let i = 0; i < len; i++) {
        const index = (i + offset) % len;
        result += str[index];
    }

    return result;
}
console.log(reverseRotate("unar", 2));
console.log(reverseRotate("llohe", 3));