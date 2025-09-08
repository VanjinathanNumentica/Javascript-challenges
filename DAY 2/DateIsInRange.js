// Check if the number / date is in range
// ----------------------------------
// For example: checkInRange([1, 10], 4) // true since 4 is in between 1 and 10
// checkInRange([10, 100], 8) // true false 8 is not in between 10 and 100
// inRange([new Date('2025-01-01'), new Date('2025-02-01')], new Date('2025-02-01'); // false

function checkInRange(range, value) {

  if (!range || range.length !== 2) {
    console.error("Error: Range must have two values");
    return ;
  }

  const lower = range[0];
  const upper = range[1];

  if ((lower + 0 === lower) && (upper + 0 === upper) && (value + 0 === value)) {
    return value > lower && value < upper;
  }

  if ((lower - 0 !== lower) && (upper - 0 !== upper) && (value - 0 !== value)) {
    return value > lower && value < upper;
  }

  console.error("Error: Inputs must be numbers or dates");
  return null;
}

console.log(checkInRange([1, 10], 4));
console.log(checkInRange([10, 100], 8));
console.log(checkInRange([new Date('2025-01-01'), new Date('2025-02-01')], new Date('2025-02-01')));
