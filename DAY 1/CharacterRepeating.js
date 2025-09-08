// Find the characters that are repeating the most simaltaneously

// charRepeating(“traaainngfornewbie”);

function findRepeatingCharacter(inputString) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        console.log("Error: Invalid input!");
        return;
    }

    var Spaces = true;
    for (var i = 0; i < inputString.length; i++) {
        if (inputString[i] !== ' ') {
            Spaces = false;
            break;
        }
    }

    var currentChar = '';
    var currentCount = 0;
    var maxChar = '';
    var maxCount = 0;

    for (var i = 0; i < inputString.length; i++) {
        if (inputString[i] === currentChar) {
            currentCount++;
        } else {
            currentChar = inputString[i];
            currentCount = 1;
        }

        if (currentCount > maxCount) {
            maxChar = currentChar;
            maxCount = currentCount;
        }
    }

    console.log("The character that repeats the most consecutively is:", maxChar);
}
findRepeatingCharacter("traaainngfornewbie");
