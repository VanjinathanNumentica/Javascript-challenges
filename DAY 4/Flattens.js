// Write a function that flattens a nested array.Find
// For example:
// flatten([1, 2, [3, 4]]);
// output: [1,2,3,4]

function flatten(arr) {
    if (!arr || typeof arr.length !== 'number') {
        return "Error: Invalid input";
    }

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];

        if (item && typeof item.length === 'number' && typeof item !== 'string') {
            for (let j = 0; j < item.length; j++) {
                result[result.length] = item[j];
            }
        } else {
            result[result.length] = item;
        }
    }

    return result;
}
console.log(flatten([1, 2, [3, 4]]));