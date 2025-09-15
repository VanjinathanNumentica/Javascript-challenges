const people = [
  { id: "p1", name: "Arun",   email: "arun@example.com",   capacityHrsPerDay: 6 },
  { id: "p2", name: "Uma",    email: "uma@",               capacityHrsPerDay: 5 },
  { id: "p3", name: "Aadhir", email: "aadhir@example.com", capacityHrsPerDay: 4 },
  { id: "p4", name: "Aarik",  email: "aarik@example.com",  capacityHrsPerDay: 0 },
];

const todos = [
  { id: "t1",  title: "Setup repo",            estimateHrs: 2,  priority: "high",   status: "done",        due: "2025-09-16", assigneeId: "p1" },
  { id: "t2",  title: "Scaffold UI",           estimateHrs: 5,  priority: "high",   status: "in-progress", due: "2025-09-18", assigneeId: "p1", dependsOn: ["t1"] },
  { id: "t3",  title: "Build login",           estimateHrs: 8,  priority: "medium", status: "todo",        due: "2025-09-20", assigneeId: "p2" },
  { id: "t4",  title: "Payments integration",  estimateHrs: 13, priority: "high",   status: "todo",        due: "2025-09-19", assigneeId: "p2", dependsOn: ["t3"] },
  { id: "t5",  title: "Notifications",         estimateHrs: 3,  priority: "low",    status: "todo",        due: "2025-09-25", assigneeId: null },
  { id: "t6",  title: "Profile screen",        estimateHrs: 5,  priority: "medium", status: "in-progress", due: "2025-09-21", assigneeId: "p3" },
  { id: "t7",  title: "Accessibility pass",    estimateHrs: 2,  priority: "medium", status: "todo",        due: "2025-09-15", assigneeId: "p3" },
  { id: "t8",  title: "Error monitoring",      estimateHrs: 4,  priority: "low",    status: "todo",        due: "2025-09-23", assigneeId: "p4" },
  { id: "t9",  title: "Build login",           estimateHrs: 8,  priority: "medium", status: "todo",        due: "2025-09-20", assigneeId: "p2" },
  { id: "t10", title: "Refactor utils",        estimateHrs: 3,  priority: "low",    status: "done",        due: "2025-09-14", assigneeId: "p1" },
  { id: "t11", title: "Release v1",            estimateHrs: 6,  priority: "high",   status: "blocked",     due: "2025-09-22", assigneeId: "p2", dependsOn: ["t4","t6"] },
  { id: "t12", title: "Data migration",        estimateHrs: 7,  priority: "high",   status: "todo",        due: "2025-09-28", assigneeId: "p3", dependsOn: ["t4","t99"] },
  { id: "t13", title: "Cycle check A",         estimateHrs: 1,  priority: "low",    status: "todo",        due: "2025-09-30", assigneeId: "p3", dependsOn: ["t14"] },
  { id: "t14", title: "Cycle check B",         estimateHrs: 1,  priority: "low",    status: "todo",        due: "2025-09-30", assigneeId: "p3", dependsOn: ["t13"] },
];

const sprintDays = 5;
const today = "2025-09-15";

// 1. Find all todos with priority not low and status not done

function PriorityOfAllTodos(todos){
  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.priority !== "low" && todo.status !== "done") {
      result.push({
        id: todo.id,
        title: todo.title,
        assigneeId: todo.assigneeId
      });
    }
  }
  return result;
}

// 2. Print each person’s details as Name <email> and mark invalid emails

function PrintInvalidEmails(people){
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const at = person.email.indexOf("@");
    const dot = person.email.lastIndexOf(".");
    const valid = at > 0 && dot > at + 1 && dot < person.email.length - 1;
    let line = `${person.name} <${person.email}>`;
    if (!valid) line += " (INVALID EMAIL)";
    console.log(line);
  }
}

// 3. Show total estimated hours of open (not done) tasks grouped by person

function getOpenHours(todos, people) {
  const result = {};
  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (task.status === "done") continue;
    const pid = task.assigneeId || "Unassigned";
    if (!result[pid]) result[pid] = 0;
    result[pid] += task.estimateHrs;
  }

  const output = [];
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    output.push({ person: person.name, hrs: result[person.id] || 0 });
  }
  output.push({ person: "Unassigned", hrs: result["Unassigned"] || 0 });
  return output;
}

// 4. List tasks not done and due before today

function getOverdue(todos, people, today) {
  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (task.status === "done") continue;
    if (task.due <= today) {
      let name = "Unassigned";
      for (let j = 0; j < people.length; j++) {
        if (people[j].id === task.assigneeId) {
          name = people[j].name;
          break;
        }
      }
      result[result.length] = { id: task.id, title: task.title, assigneeName: name, due: task.due };
    }
  }
  return result;
}

// 5. Check if open workload fits into capacity (5-day sprint)

function checkCapacity(todos, people, sprintDays) {
  const workload = {};
  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (task.status === "done" || !task.assigneeId) continue;
    if (!workload[task.assigneeId]) workload[task.assigneeId] = 0;
    workload[task.assigneeId] += task.estimateHrs;
  }

  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const assigned = workload[person.id] || 0;
    const capacity = person.capacityHrsPerDay * sprintDays;
    const diff = assigned - capacity;
    if (diff > 0) {
      console.log(person.name + " → OVER-ALLOCATED by " + diff + " hrs");
    } else {
      console.log(person.name + " → OK");
    }
  }
}

// 6. Find tasks that depend on a non-existent task

function getMissingDeps(todos) {
  const ids = {};
  for (let i = 0; i < todos.length; i++) ids[todos[i].id] = true;

  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (!task.dependsOn) continue;
    const missing = [];
    for (let j = 0; j < task.dependsOn.length; j++) {
      if (!ids[task.dependsOn[j]]) missing.push(task.dependsOn[j]);
    }
    if (missing.length > 0) {
      result.push({ id: task.id, title: task.title, dependsOn: missing });
    }
  }
  return result;
}

// 7. Find tasks that share the same title (ignoring case/spaces)

function getDuplicates(todos) {
  const map = {};
  for (let i = 0; i < todos.length; i++) {
    const key = normalize(todos[i].title);
    if (!map[key]) map[key] = [];
    map[key].push(todos[i].id);
  }

  const result = {};
  for (const k in map) {
    if (map[k].length > 1) result[denormalize(k)] = map[k];
  }
  return result;

  function normalize(str) {
    return str.toLowerCase().replace(/\s+/g, "");
  }

  function denormalize(key) {
    for (let i = 0; i < todos.length; i++) {
      if (normalize(todos[i].title) === key) return todos[i].title;
    }
    return key;
  }
}

// 8. List tasks that can start now, sorted by priority > due date > estimate

function getStartable(todos) {
  const done = {};
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === "done") done[todos[i].id] = true;
  }

  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (task.status !== "todo") continue;
    let canStart = true;
    if (task.dependsOn) {
      for (let j = 0; j < task.dependsOn.length; j++) {
        if (!done[task.dependsOn[j]]) {
          canStart = false;
          break;
        }
      }
    }
    if (canStart) result.push(task);
  }

  result.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) 
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (a.due !== b.due) return a.due < b.due ? -1 : 1;
    return a.estimateHrs - b.estimateHrs;
  });

  return result.map(task => task.id);
}

// 9. Suggest reassignment for tasks assigned to zero-capacity people

function suggestReassign(todos, people, sprintDays) {
  const zeroCapacity = {};
  const capacityMap = {};
  const workloadMap = {};

  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const cap = person.capacityHrsPerDay * sprintDays;
    capacityMap[person.id] = cap;
    workloadMap[person.id] = 0;
    if (person.capacityHrsPerDay === 0) zeroCapacity[person.id] = person.name;
  }

  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (task.status === "done" || !task.assigneeId) 
        continue;
    workloadMap[task.assigneeId] += task.estimateHrs;
  }

  const result = [];

  for (let i = 0; i < todos.length; i++) {
    const task = todos[i];
    if (task.status === "done" || !task.assigneeId) 
        continue;
    const fromId = task.assigneeId;
    if (!zeroCapacity[fromId]) 
        continue;

    let bestPerson = null;
    for (let j = 0; j < people.length; j++) {
      const person = people[j];
      if (person.capacityHrsPerDay === 0) 
        continue;
      const cap = capacityMap[person.id];
      const load = workloadMap[person.id];
      if (load + task.estimateHrs <= cap) {
        bestPerson = person.name;
        break;
      }
    }

    if (bestPerson) {
      result.push({
        todoId: task.id,
        fromPerson: zeroCapacity[fromId],
        toPersonSuggested: bestPerson
      });
    }
  }

  return result;
}

// 10. Detect dependency cycles

function findDependencyCycles(todo) {
  const adjacency = {};
  for (let i = 0; i < todo.length; i++) {
    const task = todo[i];
    adjacency[task.id] = task.dependsOn || [];
  }

  const visitedMap = {};
  const inStackMap = {};
  const cyclesFound = [];

  function findIndex(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
    return -1;
  }

  function copyFrom(array, startIndex) {
    const result = [];
    for (let i = startIndex; i < array.length; i++) {
      result.push(array[i]);
    }
    return result;
  }

  function Data(currentId, path) {
    if (inStackMap[currentId]) {
      const startIndex = findIndex(path, currentId);
      if (startIndex >= 0) {
        const cycle = copyFrom(path, startIndex);
        cycle.push(currentId);
        cyclesFound.push(cycle);
      }
      return;
    }
    if (visitedMap[currentId]) return;

    visitedMap[currentId] = true;
    inStackMap[currentId] = true;
    path.push(currentId);

    const neighbors = adjacency[currentId] || [];
    for (let i = 0; i < neighbors.length; i++) {
      Data(neighbors[i], path);
    }

    path.pop();
    inStackMap[currentId] = false;
  }

  for (const id in adjacency) {
    if (!visitedMap[id]) Data(id, []);
  }

  if (cyclesFound.length === 0) {
    console.log("No dependency cycles detected.");
  } else {
    console.log("Dependency cycles detected:");
    for (let i = 0; i < cyclesFound.length; i++) {
      console.log(cyclesFound[i]);
    }
  }
  return cyclesFound;
}

function RunResults() {
  console.log("\n1. Priority todos (not low, not done):");
  console.table(PriorityOfAllTodos(todos));

  console.log("\n2. People and email validity:");
  PrintInvalidEmails(people);

  console.log("\n3. Open hours per person:");
  console.table(getOpenHours(todos, people));

  console.log("\n4. Overdue tasks:");
  console.table(getOverdue(todos, people, today));

  console.log("\n5. Capacity check:");
  checkCapacity(todos, people, sprintDays);

  console.log("\n6. Tasks with missing dependencies:");
  console.table(getMissingDeps(todos));

  console.log("\n7. Duplicate task titles:");
  console.table(getDuplicates(todos));

  console.log("\n8. Startable tasks:");
  console.table(getStartable(todos));

  console.log("\n9. Suggested reassignments for zero-capacity assignees:");
  console.table(suggestReassign(todos, people, sprintDays));

  console.log("\n10. Dependency cycles:");
  findDependencyCycles(todos);
}

RunResults();