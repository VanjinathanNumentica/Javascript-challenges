// Group multiples from 1 to 10
// const inputArr = [34, 12, 10, 15, 7, 21, 81]
// Output = [{1: [34, 12, 10, 15, 7, 21, 81]}, { 2: [34, 12, 10]}, {3: [12, 15, 21, 81] }]

function groupMultiples(arr) {
    if (!arr || typeof arr.length !== 'number') {
        return "Error: Invalid input";
    }

    let result = [];

    for (let d = 1; d <= 10; d++) {
        let group = [];

        for (let i = 0; i < arr.length; i++) {
            let num = arr[i];
            if (num % d === 0) {
                group.push(num);
            }
        }

        if (group.length > 0) {
            let obj = {};
            obj[d] = group;
            result.push(obj);
        }
    }

    return result;
}
const inputArr = [34, 12, 10, 15, 7, 21, 81];
console.log(groupMultiples(inputArr));