// const students = [
//   {
//     id: 0,
//     name: ‘Arun’,
//     books: [‘Wings of Fire’, ‘Chakra’],
//   },
//   {
//     id: 1,
//     name: ‘Ashok’,
//     books: [‘Chakra’, ‘War and Peace’, ‘The Shining’]
//   },
//   {
//     id: 2,
//     name: ‘Balu’,
//     books: [‘Wings of Fire’, ‘All about Cricket’],
//   },
//   {
//     id: 3,
//     name: ‘Cathi’,
//     books: [‘Against the wind’, ‘The Shining’, ‘War and Peace’]
//   },
// ];
// Find the common interest in books for the students
// Output
// Wings of Fire - [‘Arun’, ‘Balu’]
// Chakra - [‘Arun’, ‘Ashok’]
// War and Peace - [‘Ashok’, ‘Cathi’],
// All about Cricket- [‘Balu’],
// Against the wind- [‘Cathi’]
// The Shining - [‘Cathi’, ‘Ashok’]
// Find the user who shares most interest with other users.
// For example: Ashok since he shares book interest with Arun, Cathi. And also Arun since he shares interest with Balu and Ashok

function commonInterestInBooks(students) {
    if (!students || !Array.isArray(students) || students.length === 0) {
        console.error("Error: Invalid input, please give the proper input");
        return false;
    }

    const bookToStudentMap = {};
    const sharedWith = {};

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (!student || !student.name || !Array.isArray(student.books)) {
            continue;
        }

        for (let j = 0; j < student.books.length; j++) {
            const bookName = student.books[j]; // keep original case

            if (!bookToStudentMap[bookName]) {
                bookToStudentMap[bookName] = [];
            }

            // Avoid duplicates
            let alreadyExists = false;
            for (let k = 0; k < bookToStudentMap[bookName].length; k++) {
                if (bookToStudentMap[bookName][k] === student.name) {
                    alreadyExists = true;
                    break;
                }
            }
            if (!alreadyExists) {
                bookToStudentMap[bookName].push(student.name);
            }
        }
    }

    // Print book → students list
    for (let bookName in bookToStudentMap) {
        let studentNamesList = "";
        for (let i = 0; i < bookToStudentMap[bookName].length; i++) {
            studentNamesList += "‘" + bookToStudentMap[bookName][i] + "’";
            if (i < bookToStudentMap[bookName].length - 1) {
                studentNamesList += ", ";
            }
        }
        console.log(bookName + " - [" + studentNamesList + "]");
    }

    // Build shared-with map
    for (let bookName in bookToStudentMap) {
        const studentsWithBook = bookToStudentMap[bookName];
        if (studentsWithBook.length > 1) {
            for (let i = 0; i < studentsWithBook.length; i++) {
                const studentName = studentsWithBook[i];
                if (!sharedWith[studentName]) {
                    sharedWith[studentName] = {};
                }
                for (let j = 0; j < studentsWithBook.length; j++) {
                    if (i !== j) {
                        sharedWith[studentName][studentsWithBook[j]] = true;
                    }
                }
            }
        }
    }

    // Find max unique shared count
    let maxSharedCount = 0;
    for (let studentName in sharedWith) {
        const count = Object.keys(sharedWith[studentName]).length;
        if (count > maxSharedCount) {
            maxSharedCount = count;
        }
    }

    // Collect all students with max shared count
    const mostSharedStudents = [];
    for (let studentName in sharedWith) {
        if (Object.keys(sharedWith[studentName]).length === maxSharedCount) {
            mostSharedStudents.push("‘" + studentName + "’");
        }
    }

    console.log("Most shared interest: [" + mostSharedStudents.join(", ") + "]");
}
commonInterestInBooks([
    {
        id: 0,
        name: 'Arun',
        books: ['Wings of Fire', 'Chakra'],
    }, {
        id: 1,
        name: 'Ashok',
        books: ['Chakra', 'War and Peace', 'The Shining']
    }, {
        id: 2,
        name: 'Balu',
        books: ['Wings of Fire', 'All about Cricket'],
    }, {
        id: 3,
        name: 'Cathi',
        books: ['Against the wind', 'The Shining', 'War and Peace']
    },
]);