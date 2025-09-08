// Find sum of multiples

// findSum(5, 5) should return 5+10+15+20+25=75
// findSum(8, 3) should return 8+16+24=48


function sumOfMultiples(value, count) {
    var sum = 0;

    if (
        value === undefined || count === undefined ||
        value === '' || count === '' ||
        typeof value !== 'number' || typeof count !== 'number'
    ) {
        console.log("Error: Invalid input.");
        return;
    }

    for (var i = 1; i <= count; i++) {
        sum = sum + (value * i);
    }

    console.log("The output is", sum);
}

sumOfMultiples(5, 5);
sumOfMultiples(8, 3);
