// Check if a number is divisible by all numbers in a given range.
// For example:
// isDivisibleInRange([1, 5], 60) // true  (60 is divisible by 1,2,3,4,5)
// isDivisibleInRange([1, 5], 15) // false (15 is not divisible by 4)
// isDivisibleInRange([2, 6], 120) // true  (120 % 2,3,4,5,6 === 0)

function isDivisibleInRange(range, value) {
    if (
        !Array.isArray(range) ||
        range.length !== 2 ||
        typeof range[0] !== 'number' ||
        typeof range[1] !== 'number' ||
        typeof value !== 'number'
    ) {
        console.error("Invalid input: range must be a two-number array, and value must be a number.");
        return false;
    }

    let start, end;

    if (range[0] < range[1]) {
        start = range[0];
        end = range[1];
    } else {
        start = range[1];
        end = range[0];
    }

    for (let i = start; i <= end; i++) {
        if (i === 0) continue;
        if (value % i !== 0) return false;
    }

    return true;
}

console.log(isDivisibleInRange([1, 5], 60));
console.log(isDivisibleInRange([1, 5], 15));   
console.log(isDivisibleInRange([2, 6], 120));