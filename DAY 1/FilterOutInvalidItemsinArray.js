// Given an array, filter out the invalid items

// filterOut([“a”, “d”, 1, true, “cd”, 33], “number”);
// filterOut([“a”, “d”, 1, true, “cd”, 33], “boolean”);
// filterOut([“a”, “d”, 1, true, “cd”, 33], “string”);


function filterOut(array, invalidType) {
    var validItems = [];
    var index = 0;

    if (array.length == 0) {  
        return(
            console.error("Error: Input array is empty.")
        );
    }

    var targetType = invalidType.toLowerCase();

    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] !== targetType) {
            validItems[index] = array[i];
            index++;
        }
    }

    console.log(validItems);
}
filterOut(["a", "d", 1, true, "cd", 33], "number",);
filterOut(["a", "d", 1, true, "cd", 33], "boolean",);
filterOut(["a", "d", 1, true, "cd", 33], "string",);