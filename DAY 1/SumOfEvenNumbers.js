// Find the sum of even numbers in an array. 
// Find all the even numbers in an array and add them

// findEvenSum([38, 3, 2, 8, 31])

function findEvenSum(userInput) {
    if (userInput.length === 0) {
        return(
            console.error("Error: Input Array is Empty")
        );
    }

    let sumEven = 0;
    let hasEven = false; 

    for (var i = 0; i < userInput.length; i++) {
        var currentItem = userInput[i];

        if (typeof currentItem === 'number') {
            if (currentItem % 2 === 0) {
                sumEven += currentItem;
                hasEven = true; 
            }
        }
    }

    if (!hasEven) {
        console.log("No even numbers found in the input.");
    } else {
        console.log("Sum of even numbers:", sumEven);
    }
}

findEvenSum([38, 3, 2, 8, 31]);
