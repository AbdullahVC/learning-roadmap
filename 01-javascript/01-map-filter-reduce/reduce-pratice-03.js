const employees = [
  { name: "Ali", salary: 3000 },
  { name: "Veli", salary: 4500 },
  { name: "Ayşe", salary: 4000 },
  { name: "Fatma", salary: 5000 },
];

const richest = employees.reduce((prev, current) => {
  return prev.salary > current.salary ? prev : current;
}, "");

console.log(richest);
