// Group names according to the initial character
// Input: ["arun", "balu", "cathy", "krish", "aadhir", "aariketh", "kamal"]
// Output
// ["arun", "aadhir", "aariketh"]
// ["balu"]
// ["cathy"]
// ["krish", "kamal"]

function groupNamesByInitialLetter(names) {
  if (!Array.isArray(names)) {
    console.error('Error: Invalid input. Expected an array.');
    return;
  }

  if (names.length === 0) {
    console.error('Error: Empty array provided.');
    return;
  }

  let groupedNames = {};

  for (let i = 0; i < names.length; i++) {
    let currentName = names[i];

    if (typeof currentName !== 'string' || currentName.length === 0) {
      continue;
    }

    let initial = currentName[0].toLowerCase();

    if (groupedNames[initial] === undefined) {
      groupedNames[initial] = [];
    }

    groupedNames[initial].push(currentName);
  }

  return groupedNames;
}
let input = ["arun", "balu", "cathy", "Krish", "aadhir", "aariketh", "kamal"];
let result = groupNamesByInitialLetter(input);
console.log(result);