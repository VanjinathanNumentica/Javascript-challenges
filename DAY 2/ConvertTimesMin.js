// convertTimeToMinutes(timeStr, options = { round: 'down' })
// ----------------------------------------------------
// Convert "HH:MM[:SS][ am/pm]" to minutes. Support 12h/24h (not mixed).
// Hours can exceed 24. Seconds rounding: 'down'|'nearest'|'up'. Throw on invalid.

// "2:30" → 150
// "2:30:45" → 151 if round:'nearest', else 150
// "12:00 am" → 0
// "12:00 pm" → 720
// "24:00" → 1440
// "14:70" → throw (invalid minutes)

function convertTimeToMinutes(timeToConvert, options) {
    let hours = 0, minutes = 0, seconds = 0;
    let colonCount = 0;
    let i = 0;
    let currentValue = 0;
    let valueIndex = 0; 
    let period = "";

    while (i < timeToConvert.length) {
        const code = timeToConvert.charCodeAt(i);

        if (code >= 48 && code <= 57) {
            currentValue = currentValue * 10 + (code - 48);
        } else if (code === 58) { 
            if (valueIndex === 0) {
                hours = currentValue;
            } else if (valueIndex === 1) {
                minutes = currentValue;
            }
            currentValue = 0;
            valueIndex++;
            colonCount++;
        } else if (code === 32) { 
            i++;
            break;
        } else {
            break;
        }
        i++;
    }

    if (valueIndex === 0) {
        hours = currentValue;
    } else if (valueIndex === 1) {
        minutes = currentValue;
    } else if (valueIndex === 2) {
        seconds = currentValue;
    }

    while (i < timeToConvert.length) {
        const c = timeToConvert.charCodeAt(i);
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            period += String.fromCharCode(c);
        }
        i++;
    }

    const firstChar = period.length > 0 ? period.charCodeAt(0) : 0;
    const isAM = firstChar === 65 || firstChar === 97;
    const isPM = firstChar === 80 || firstChar === 112;

    if ((isAM || isPM) && hours > 12) {
        console.error("Don't mix 24-hour format with AM/PM.");
        return "";
    }

    if (isPM && hours !== 12) {
        hours += 12;
    }

    if (isAM && hours === 12) {
        hours = 0;
    }

    if (options && options.round === 'nearest' && seconds >= 30) {
        minutes += 1;
    }

    const totalMinutes = hours * 60 + minutes;

    if (!isAM && !isPM && totalMinutes > 1440) {
        console.error("Time exceeds 24-hour range.");
        return "";
    }

    return totalMinutes;
}
console.log(convertTimeToMinutes("2:30"));
console.log(convertTimeToMinutes("2:30:45", { round: 'nearest' }));
console.log(convertTimeToMinutes("12:00 am"));
console.log(convertTimeToMinutes("12:00 pm"));
console.log(convertTimeToMinutes("24:00"));