// Split an string into an array

// repeat(“arun”, 3);


function stringSplit(str, size) {
    const result = [];
    let input = "";

    for (let i = 0; i < str.length; i++){
        input += str[i];

        if(input.length === size || i === str.length -1){
            result.push(input);
            input = "";
        }
    }
    return result; 
}
console.log(stringSplit("numenticaui",2))