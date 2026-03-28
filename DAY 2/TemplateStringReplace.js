// Template String Replace
// ----------------------------

// const string = “Numentica is a company focused on delivering high quality code. It is located in #[location] #[state] #[phone]“;
// replaceTemplateString(string, [[“location”, “Chennai”], [“state”, “Tamil Nadu”], [“phone”, “9840164723"]])
// Output: Numentica is a company focused on delivering high quality code. It is located in Chennai Tamil Nadu 9840164723

function replaceTemplateString(str, values) {
    
    let lookup = {};
    for (let i = 0; i < values.length; i++) {
        lookup[values[i][0]] = values[i][1];
    }

    let result = '';
    let i = 0;
    while (i < str.length) {
        if (str[i] === '#' && str[i + 1] === '[') {
            i += 2; 
            let key = '';
            while (i < str.length && str[i] !== ']') {
                key += str[i];
                i++;
            }
            i++;
            
            let replacement = lookup[key];
            if (replacement !== undefined) {
                for (let j = 0; j < replacement.length; j++) {
                    result += replacement[j];
                }
            }
        } else {
            result += str[i];
            i++;
        }
    }

    return result;
}

let string = "Numentica is a company focused on delivering high quality code. It is located in #[location] #[state] #[phone]";
let values = [["location", "Chennai"], ["state", "Tamil Nadu"], ["phone", "9840164723"]];
let output = replaceTemplateString(string, values);
console.log(output);
