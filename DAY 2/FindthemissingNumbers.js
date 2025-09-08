// Find the missing number / numbers
// ----------------------------------------
// Example: Given an array of numbers in random order, find the missing numbers
// [7, 10, 12, 9] // output [8, 11] since these are the numbers missing in 7, 9, 10, 12
// Note: The numbers will be given as input in any order.

function findMissingNumbers(input) {
  if (!input || input.length < 2) {
    console.error("Error: Input array is empty or too short.");
    return null;
  }

  let min = input[0];
  let max = input[0];
  for (let i = 1; i < input.length; i++) {
    if (input[i] < min) min = input[i];
    if (input[i] > max) max = input[i];
  }

  const missingNumbers = [];
  for (let number = min + 1; number < max; number++) {
    let found = false;
    for (let j = 0; j < input.length; j++) {
      if (input[j] === number) {
        found = true;
        break;
      }
    }
    if (!found) missingNumbers.push(number);
  }

  return missingNumbers;
}
const Input = [7, 10, 12, 9];
console.log("Missing numbers:", findMissingNumbers(Input));
