// Return the highest-paid person per department.
// const employees = [
//   { name: "Raj", dept: "IT", salary: 600 },
//   { name: "Arun", dept: "IT", salary: 750 },
//   { name: "Deepak", dept: "HR", salary: 500 }
// ];
// highestSalary(employees);
// // Output: { IT: {name:"Jane", salary:750}, HR: {name: "Deepak", salary: 500} }

function highestSalary(employees) {
    if (!employees || typeof employees.length !== 'number') {
        return "Error: Invalid input";
    }

    let result = {};

    for (let i = 0; i < employees.length; i++) {
        let emp = employees[i];
        let dept = emp.dept;
        let name = emp.name;
        let salary = emp.salary;

        if (!result[dept]) {
            result[dept] = { name: name, salary: salary };
        } else {
            if (salary > result[dept].salary) {
                result[dept] = { name: name, salary: salary };
            }
        }
    }

    return result;
}
const employees = [
  { name: "Raj", dept: "IT", salary: 600 },
  { name: "Arun", dept: "IT", salary: 750 },
  { name: "Deepak", dept: "HR", salary: 500 }
];

console.table(highestSalary(employees));