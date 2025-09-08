// Repeat string

// repeat(“arun”, 3);

function repeatstring(str , count){
    let results = "";

    if(typeof str !== 'string' || typeof count !== 'number' || count < 0)
    {
        console.log("Error: Invalid input.");
        return;
    }

    for (let i = 0; i < count; i++) {
        results += str;
    }
    console.log(results);
}

repeatstring("arun", 3)