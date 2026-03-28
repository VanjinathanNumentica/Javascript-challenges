// Return the sum of smallest and largest number in an array
// ---------------------------------------------------------
// Example: [45, 2, 25, 11, 16]
// Here the output will be 2(smallest) + 45 (largest)
// Output will be 47

function sumOfMinAndMax(Input) {
    if (Input.length === 0 || Input.length < 2) {
        return(
            console.error("Error: Input Array is Empty (Or) Input Array contains Only One Number")
        );
    }
    let min = Input[0];
    let max = Input[0];

    for(i=0; i<Input.length; i++) {
        const val = Input[i];
        if(typeof val !== 'number'){
            return(
            console.error("Error: Array must contains only Numbers")
            );
        }
        if (val < min) min = val;
        if (val > max) max = val;
    }
    return min+max;
}

const Input = [45, 2, 25, 11, 16]
console.log("Sum of Smallest and Largest:",sumOfMinAndMax(Input))
