// Implement a function to rotate the characters in a string by a given number of positions.
// If the number is positive, rotate to the right.
// If the number is negative, rotate to the left.
// For example:
// rotate("arun", 2)   // "unar"
// rotate("arun", -2)  // "unar" (left rotation)
// rotate("hello", 3)  // "llohe"

function rotateString(str, shift) {
    if (typeof str !== 'string' || typeof shift !== 'number') {
        console.error("Invalid input: first argument must be a string, second must be a number.");
        return '';
    }

    const len = str.length;
    if (len === 0) return '';

    let offset = shift % len;
    if (offset < 0) offset += len;

    let result = '';
    for (let i = 0; i < len; i++) {
        const index = (i - offset + len) % len;
        result += str[index];
    }

    return result;
}
console.log(rotateString("arun", 2));
console.log(rotateString("arun", -2));
console.log(rotateString("hello", 3));