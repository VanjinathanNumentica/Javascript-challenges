// Calculate total hours passed between two time
// Accepted input format example "9:00 AM"
// Ex: calculateTotalHoursElapsed("9:00 AM", "10:00 AM") //Output 1 Hour
// Ex: calculateTotalHoursElapsed("9:00 AM", "3:12 PM") // Output 6 Hour 12 minutes

function calculateTotalHoursElapsed(startingTime, endingTime) {
  if (typeof startingTime !== 'string' || typeof endingTime !== 'string') {
    return (
        console.error("Error: Invalid input. Check your input.")
    );
  }

  if (!startingTime || !endingTime) {
    return (
    console.error("Error: Please enter Starting/Ending time!.")
    );
  }

  const start = convertTimeToMinutes(startingTime);
  const end = convertTimeToMinutes(endingTime);

  let diff = end - start;
  if (diff < 0) diff += 1440;

  let hours = 0;
  while (diff >= 60) {
    hours++;
    diff -= 60;
  }

  const minutes = diff;
  return hours + " Hours " + minutes + " minutes";

  function convertTimeToMinutes(timeStr) {
  const parts = timeStr.trim().split(' ');
  if (parts.length !== 2) return -1;

  const [time, period] = parts;
  const [hourStr, minuteStr] = time.split(':');

  let hour = +hourStr;
  let minute = +minuteStr;

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  return hour * 60 + minute;
}

}

console.log(calculateTotalHoursElapsed("09:00 AM", "03:15 PM"));