// formatUSPhone
// ---------------------
// Convert a ten digit number into US phone formatting "(AAA) BBB-CCCC"
// For example: 9840164723 to "(984)016-473"
// Throw error if it's not a valid phone number


function formatUSPhone(tenDigitNumber) {

  if (typeof tenDigitNumber !== 'number' || !Number.isInteger(tenDigitNumber)) {
    throw new Error("Error: Input must be a 10-digit integer.");
  }
  if (tenDigitNumber < 1000000000 || tenDigitNumber > 9999999999) {
    throw new Error("Error: Invalid phone number — must be a 10-digit number.");
  }

  const digitMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const digits = [];

  while (tenDigitNumber > 0) {
    const digit = tenDigitNumber % 10;
    digits.push(digitMap[digit]);
    tenDigitNumber = (tenDigitNumber - digit) /10;
  }

  const orderedDigits = [];
  for (let i = digits.length - 1; i >= 0; i--) {
    orderedDigits.push(digits[i]);
  }

  const USFormat =
    "(" + orderedDigits[0] + orderedDigits[1] + orderedDigits[2] + ") " +
    orderedDigits[3] + orderedDigits[4] + orderedDigits[5] + "-" +
    orderedDigits[6] + orderedDigits[7] + orderedDigits[8] + orderedDigits[9];

  return USFormat;
}

console.log(formatUSPhone(9840164723));

