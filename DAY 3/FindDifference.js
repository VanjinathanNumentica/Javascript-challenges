// 2. Find the numbers that are present in one array but not in the other.
// For example:
// const arr1 = [3, 45, 42, 11, 34];
// const arr2 = [35, -7, 87, 11, 1, 45];
// findDifference(arr1, arr2)
// Output: [3, 42, 34, 35, -7, 87, 1]

// function findDifference(arr1, arr2) {
//     const result = [];

//     // Check elements in arr1 not in arr2
//     for (let i = 0; i < arr1.length; i++) {
//         const val = arr1[i];
//         let found = false;
//         for (let j = 0; j < arr2.length; j++) {
//             if (val === arr2[j]) {
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) result.push(val);
//     }

//     // Check elements in arr2 not in arr1
//     for (let i = 0; i < arr2.length; i++) {
//         const val = arr2[i];
//         let found = false;
//         for (let j = 0; j < arr1.length; j++) {
//             if (val === arr1[j]) {
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) result.push(val);
//     }

//     return result;
// }

// const arr1 = [3, 45, 42, 11, 34];
// const arr2 = [35, -7, 87, 11, 1, 45];

// // console.log(findDifference(arr1, arr2)); // Output: [3, 42, 34, 35, -7, 87, 1]
// console.log(findDifference(arr1, arr2).join(', '));

function findDifference(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.error("Error: Both inputs must be arrays.");
        return;
    }

    if (arr1.length === 0 && arr2.length === 0) {
        console.error("Error: Both arrays are empty.");
        return;
    }

    const result = [];

    // Elements in arr1 not in arr2
    for (let i = 0; i < arr1.length; i++) {
        const val = arr1[i];
        let found = false;
        for (let j = 0; j < arr2.length; j++) {
            if (val === arr2[j]) {
                found = true;
                break;
            }
        }
        if (!found) result.push(val);
    }

    // Elements in arr2 not in arr1
    for (let i = 0; i < arr2.length; i++) {
        const val = arr2[i];
        let found = false;
        for (let j = 0; j < arr1.length; j++) {
            if (val === arr1[j]) {
                found = true;
                break;
            }
        }
        if (!found) result.push(val);
    }

    if (result.length === 0) {
        console.log("No unique elements found between the arrays.");
    } else {
        console.log("Difference in two array:", result.join(', '));
    }
}
const arr1 = [3, 45, 42, 11, 34];
const arr2 = [35, -7, 87, 11, 1, 45];

findDifference(arr1, arr2);

