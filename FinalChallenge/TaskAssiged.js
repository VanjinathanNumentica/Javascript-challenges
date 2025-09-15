const people = [
  { id: "p1", name: "Arun",   email: "arun@example.com",   capacitableyHrsPerDay: 6 },
  { id: "p2", name: "Uma",    email: "uma@",               capacitableyHrsPerDay: 5 }, // invalid email
  { id: "p3", name: "Aadhir", email: "aadhir@example.com", capacityHrsPerDay: 4 },
  { id: "p4", name: "Aarik",  email: "aarik@example.com",  capacityHrsPerDay: 0 }, // edge: zero capacity
];
const todos = [
  // id, title, estimateHrs, priority, status, due(YYYY-MM-DD), assigneeId?, dependsOn?
  { id: "t1",  title: "Setup repo",            estimateHrs: 2, priority: "high",   status: "done",        due: "2025-09-16", assigneeId: "p1" },
  { id: "t2",  title: "Scaffold UI",           estimateHrs: 5, priority: "high",   status: "in-progress", due: "2025-09-18", assigneeId: "p1", dependsOn: ["t1"] },
  { id: "t3",  title: "Build login",           estimateHrs: 8, priority: "medium", status: "todo",        due: "2025-09-20", assigneeId: "p2" },
  { id: "t4",  title: "Payments integration",  estimateHrs: 13,priority: "high",   status: "todo",        due: "2025-09-19", assigneeId: "p2", dependsOn: ["t3"] },
  { id: "t5",  title: "Notifications",         estimateHrs: 3, priority: "low",    status: "todo",        due: "2025-09-25", assigneeId: null }, // unassigned
  { id: "t6",  title: "Profile screen",        estimateHrs: 5, priority: "medium", status: "in-progress", due: "2025-09-21", assigneeId: "p3" },
  { id: "t7",  title: "Accessibility pass",    estimateHrs: 2, priority: "medium", status: "todo",        due: "2025-09-15", assigneeId: "p3" }, // overdue (today is 2025-09-15 IST)
  { id: "t8",  title: "Error monitoring",      estimateHrs: 4, priority: "low",    status: "todo",        due: "2025-09-23", assigneeId: "p4" }, // zero-capacity assignee
  { id: "t9",  title: "Build login",           estimateHrs: 8, priority: "medium", status: "todo",        due: "2025-09-20", assigneeId: "p2" }, // duplicate title
  { id: "t10", title: "Refactor utils",        estimateHrs: 3, priority: "low",    status: "done",        due: "2025-09-14", assigneeId: "p1" }, // done but due in past
  { id: "t11", title: "Release v1",            estimateHrs: 6, priority: "high",   status: "blocked",     due: "2025-09-22", assigneeId: "p2", dependsOn: ["t4","t6"] },
  { id: "t12", title: "Data migration",        estimateHrs: 7, priority: "high",   status: "todo",        due: "2025-09-28", assigneeId: "p3", dependsOn: ["t4","t99"] }, // missing dep t99
  { id: "t13", title: "Cycle check A",         estimateHrs: 1, priority: "low",    status: "todo",        due: "2025-09-30", assigneeId: "p3", dependsOn: ["t14"] },
  { id: "t14", title: "Cycle check B",         estimateHrs: 1, priority: "low",    status: "todo",        due: "2025-09-30", assigneeId: "p3", dependsOn: ["t13"] },
];

const sprintDays = 5;
const sprintHours = 5 * 8;
const today = "2025-09-15";

// Find all todos with priority not low and status not done.
function PriorityOfAllTodos(todos){
const result = [];

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    const isPriorityValid = todo.priority !== "low";
    const isStatusValid = todo.status !== "done";

    if (isPriorityValid && isStatusValid) {
      result.push({
        id: todo.id,
        title: todo.title,
        assigneeId: todo.assigneeId
      });
    }
  }
      return result;
}

// Print each person’s details as Name <email> and mark invalid emails

function PrintInvalidEmails(people){
  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    const at = p.email.indexOf("@");
    const dot = p.email.lastIndexOf(".");
    const valid = at > 0 && dot > at + 1 && dot < p.email.length - 1;
    let line = `${p.name} <${p.email}>`;
    if (!valid) line += " (INVALID EMAIL)";
    console.log(line);
  }
}


// Show total estimated hours of open (not done) tasks grouped by person

function getOpenHours(todos, people) {
  const result = {};
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    if (t.status === "done") continue;
    const pid = t.assigneeId || "Unassigned";
    if (!result[pid]) result[pid] = 0;
    result[pid] += t.estimateHrs;
  }

  const output = [];
  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    output[output.length] = { person: p.name, hrs: result[p.id] || 0 };
  }
  output[output.length] = { person: "Unassigned", hrs: result["Unassigned"] || 0 };
  return output;
}

// List tasks not done and due before today.

function getOverdue(todos, people, today) {
  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    if (t.status === "done") continue;
    if (t.due <= today) {
      let name = "Unassigned";
      for (let j = 0; j < people.length; j++) {
        if (people[j].id === t.assigneeId) {
          name = people[j].name;
          break;
        }
      }
      result[result.length] = { id: t.id, title: t.title, assigneeName: name, due: t.due };
    }
  }
  return result;
}

// Check if open workload fits into capacity (5-day sprint). 5 day sprint is 40 hours

function checkCapacity(todos, people, sprintDays) {
  const workload = {};
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    if (t.status === "done" || !t.assigneeId) continue;
    if (!workload[t.assigneeId]) workload[t.assigneeId] = 0;
    workload[t.assigneeId] += t.estimateHrs;
  }

  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    const assigned = workload[p.id] || 0;
    const capacity = p.capacityHrsPerDay * sprintDays;
    const diff = assigned - capacity;
    if (diff > 0) {
      console.log(p.name + " → OVER-ALLOCATED by " + diff + " hrs");
    } else {
      console.log(p.name + " → OK");
    }
  }
}


// Find tasks that depend on a non-existent task which means the taskId in dependsOn is not a valid task.

function getMissingDeps(todos) {
  const ids = {};
  for (let i = 0; i < todos.length; i++) ids[todos[i].id] = true;

  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    if (!t.dependsOn) continue;
    const missing = [];
    for (let j = 0; j < t.dependsOn.length; j++) {
      if (!ids[t.dependsOn[j]]) missing[missing.length] = t.dependsOn[j];
    }
    if (missing.length > 0) {
      result[result.length] = { id: t.id, title: t.title, dependsOn: missing };
    }
  }
  return result;
}

// Find tasks that share the same title (ignoring case/spaces).

function getDuplicates(todos) {
  const map = {};
  for (let i = 0; i < todos.length; i++) {
    const key = normalize(todos[i].title);
    if (!map[key]) map[key] = [];
    map[key][map[key].length] = todos[i].id;
  }

  const result = {};
  for (const k in map) {
    if (map[k].length > 1) result[denormalize(k)] = map[k];
  }
  return result;

  function normalize(str) {
    let out = "";
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch !== " ") out += ch.toLowerCase();
    }
    return out;
  }

  function denormalize(key) {
    for (let i = 0; i < todos.length; i++) {
      if (normalize(todos[i].title) === key) return todos[i].title;
    }
    return key;
  }
}

// List tasks that can start now, sorted by priority > due date > estimate.

function getStartable(todos) {
  const done = {};
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === "done") done[todos[i].id] = true;
  }

  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    if (t.status !== "todo") continue;
    let canStart = true;
    if (t.dependsOn) {
      for (let j = 0; j < t.dependsOn.length; j++) {
        if (!done[t.dependsOn[j]]) {
          canStart = false;
          break;
        }
      }
    }
    if (canStart) result[result.length] = t;
  }

  // Manual sort by priority > due > estimate
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (compare(result[i], result[j]) > 0) {
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
    }
  }

  const output = [];
  for (let i = 0; i < result.length; i++) output[output.length] = result[i].id;
  return output;

  function compare(a, b) {
    const p = { high: 1, medium: 2, low: 3 };
    if (p[a.priority] !== p[b.priority]) return p[a.priority] - p[b.priority];
    if (a.due !== b.due) return a.due < b.due ? -1 : 1;
    return a.estimateHrs - b.estimateHrs;
  }
}

// Suggest reassignment for tasks assigned to zero-capacity people. toPersonSuggested can be to multiple person / single person.

function suggestReassign(todos, people, sprintDays) {
  const zeroCapacity = {};
  const capacityMap = {};
  const workloadMap = {};

  // Build capacity and workload maps
  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    const cap = p.capacityHrsPerDay * sprintDays;
    capacityMap[p.id] = cap;
    workloadMap[p.id] = 0;
    if (p.capacityHrsPerDay === 0) zeroCapacity[p.id] = p.name;
  }

  // Accumulate workload
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    if (t.status === "done" || !t.assigneeId) continue;
    workloadMap[t.assigneeId] += t.estimateHrs;
  }

  const result = [];

  // Suggest reassignment
  for (let i = 0; i < todos.length; i++) {
    const t = todos[i];
    const fromId = t.assigneeId;
    if (!zeroCapacity[fromId]) continue;

    let bestPerson = null;
    for (let j = 0; j < people.length; j++) {
      const p = people[j];
      if (p.capacityHrsPerDay === 0) continue;
      const cap = capacityMap[p.id];
      const load = workloadMap[p.id];
      if (load + t.estimateHrs <= cap) {
        bestPerson = p.name;
        break;
      }
    }

    if (bestPerson) {
      result[result.length] = {
        todoId: t.id,
        fromPerson: zeroCapacity[fromId],
        toPersonSuggested: bestPerson
      };
    }
  }

  return result;
}

console.table(PriorityOfAllTodos(todos))
PrintInvalidEmails(people)
console.table(getOpenHours(todos, people))
console.table(getOverdue(todos, people, today))
checkCapacity(todos, people, sprintDays)
console.table(getMissingDeps(todos))
console.table(getDuplicates(todos))
console.table(getStartable(todos))
console.table(suggestReassign(todos, people, sprintDays))