// Check Spaces

// checkSpaces(“arun”) output false;
// checkSpaces(“user arun”) output true;

function checkSpaces(input) {
  if (typeof input !== "string" || input.length === 0) {
    console.log("Error: Invalid input.");
    return;
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] === " ") {
      return true;
    }
  }

  return false;
}
console.log(checkSpaces("arun"));
console.log(checkSpaces("user arun"));