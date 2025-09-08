// From an array of strings, return an object with the count of each string.
// count(["a", "b", "a", "c", "b", "a"]);
// // Output: { a: 3, b: 2, c: 1 }

function count(arr) {
    if (!arr || typeof arr.length !== 'number') {
        return "Error: Invalid input";
    }

    let result = {};

    for (let i = 0; i < arr.length; i++) {
        let key = arr[i];

        if (result[key] !== undefined) {
            result[key] = result[key] + 1;
        } else {
            result[key] = 1;
        }
    }

    return result;
}
console.log(count(["a", "b", "a", "c", "b", "a"]));