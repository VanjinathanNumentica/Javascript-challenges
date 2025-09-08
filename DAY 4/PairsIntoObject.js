// Convert an array of key-value pairs into an object.
// toObject([["name", "Arun"], ["age", 39]]);
// Output: { name: "Arun", age: 39 }

function toObject(pairs) {
    if (!pairs || typeof pairs.length !== 'number') {
        return "Error: Invalid input";
    }

    let result = {};

    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];

        if (pair.length === 2) {
            let key = pair[0];
            let value = pair[1];
            result[key] = value;
        }
    }

    return result;
}
console.log(toObject([["name", "Arun"], ["age", 39]]));