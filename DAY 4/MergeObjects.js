// Merge objects with array values
// merge(
//   { fruits: ["apple"], veggies: ["carrot"] },
//   { fruits: ["banana"], drinks: ["water"] }
// );
// // Output: { fruits: ["apple", "banana"], veggies: ["carrot"], drinks: ["water"] }

function merge(obj1, obj2) {
    if (!obj1 || typeof obj1 !== 'object' || !obj2 || typeof obj2 !== 'object') {
        return "Error: Inputs are not valid objects";
    }

    let result = {};

    for (let key1 in obj1) {
        result[key1] = [];
        let arr1 = obj1[key1];
        for (let i = 0; i < arr1.length; i++) {
            result[key1][result[key1].length] = arr1[i];
        }
    }

    for (let key2 in obj2) {
        let arr2 = obj2[key2];

        if (result[key2]) {
            for (let j = 0; j < arr2.length; j++) {
                result[key2][result[key2].length] = arr2[j];
            }
        } else {
            result[key2] = [];
            for (let j = 0; j < arr2.length; j++) {
                result[key2][result[key2].length] = arr2[j];
            }
        }
    }

    return result;
}

let merged = merge(
  { fruits: ["apple"], veggies: ["carrot"] },
  { fruits: ["banana"], drinks: ["water"] }
);

console.log(merged);