// Find the common numbers in two arrays
// const arr1 = [3, 45, 42, 11, 34];
// const arr2 = [35, -7, 87, 11, 1, 45]
// findCommon(arr1, arr2)
// Output = [11, 45]

function findCommon(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.error("Error: Both inputs must be arrays.");
        return;
    }
    const result = [];

    for (let i = 0; i < arr1.length; i++) {
        const val1 = arr1[i];

        for (let j = 0; j < arr2.length; j++) {
            const val2 = arr2[j];

            if (val1 === val2) {
                // Avoid duplicates in result
                let alreadyIncluded = false;
                for (let k = 0; k < result.length; k++) {
                    if (result[k] === val1) {
                        alreadyIncluded = true;
                        break;
                    }
                }
                if (!alreadyIncluded) {
                    result.push(val1);
                }
            }
        }
    }

    return result;
}
const arr1 = [3, 45, 42, 11, 34];
const arr2 = [35, -7, 87, 11, 1, 45];

console.log(findCommon(arr1, arr2));