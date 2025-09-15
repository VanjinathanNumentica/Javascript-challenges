// Write a javascript function to return number of occurance of a particular word in a sentence

// findNumberOfOccurance(“be kind whenever possible. kindness is what matters”, “kind”);


function findNumberOfOccurance(sentence, Word) {
  if (
    typeof sentence !== "string" || typeof Word !== "string" || !sentence.length || !Word.length) {
    console.log("Error: Invalid input.");
    return;
  }

  let count = 0;
  let word = "";
  for (let i = 0; i <= sentence.length; i++) {
    const char = sentence[i];

    if (
      char === " " || char === "." || char === undefined) {
      if (word.length > 0) {
        
        let match = true;
        for (let j = 0; j < Word.length; j++) {
          if (word[j] !== Word[j]) {
            match = false;
            break;
          }
        }
        if (match) count++;
        word = "";
      }
    } else {
      word += char;
    }
  }

  return count;
}
console.log(findNumberOfOccurance("be kind whenever possible. kindness is what matters", "kind"));