// Remove duplicates in an array

// For  [1, “two”, “two”, 3, “two”];


function removeDuplicates(arr) {
  if (!arr || typeof arr !== "object" || arr.length === undefined) {
    console.error("Error: Invalid input.");
    return;
  }

  const uniqueElements = [];

  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;

    for (let j = 0; j < uniqueElements.length; j++) {
      if (arr[i] === uniqueElements[j]) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      uniqueElements.push(arr[i]);
    }
  }

  return uniqueElements;
}
console.log(removeDuplicates([1, "two", "two", 3, "two"]));
