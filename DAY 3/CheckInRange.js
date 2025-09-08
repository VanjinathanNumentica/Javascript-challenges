// Check if the number is in range
// For example:
// checkInRange([1, 10], 4) // true since 4 is in between 1
// checkInRange([10, 100], 8) // true false 8 is not in between 10 and 100

function checkInRange(Input, value) {
    if (
        !Array.isArray(Input) ||
        Input.length !== 2 ||
        typeof Input[0] !== 'number' ||
        typeof Input[1] !== 'number' ||
        typeof value !== 'number'
    ) {
        console.error("Invalid input: Input must be a two-number array, and value must be a number.");
        return false;
    }

     let lower, upper;

    if (Input[0] < Input[1]) {
        lower = Input[0];
        upper = Input[1];
    } else {
        lower = Input[1];
        upper = Input[0];
    }

    return value > lower && value < upper;
}

console.log(checkInRange([1, 10], 4));
console.log(checkInRange([10, 100], 8));
