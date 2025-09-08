// Find number of pairs in an array which has the sum provided as a parameter
// For example:
// const arr1 = [4, 2, 5, 6, 8, 1];
// const sum = 6;
// numberOfPairs(arr1, sum);
// // Pais that matches are [4, 2] => 6. [5, 1] => 6
// So output 2

function numberOfPairs(arr, target) {
    if (!arr || typeof arr.length !== 'number' || typeof target !== 'number' || arr.length === 0) {
        return "Error: Input array is empty or target is invalid";
    }

    let count = 0;
    let used = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                let a = arr[i];
                let b = arr[j];
                let found = false;

                for (let k = 0; k < used.length; k++) {
                    if ((used[k][0] === a && used[k][1] === b) ||
                        (used[k][0] === b && used[k][1] === a)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    used[used.length] = [a, b];
                    count++;
                }
            }
        }
    }

    return count;
}
let arr1 = [4, 2, 5, 6, 8, 1];
let sum = 6;
console.log(numberOfPairs(arr1, sum)); 