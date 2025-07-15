//Goal:Filter all objects where the user is active and older than 18.

const users = [
  { name: "Ali", age: 17, isActive: true },
  { name: "Veli", age: 20, isActive: false },
  { name: "Ayşe", age: 25, isActive: true },
  { name: "Fatma", age: 30, isActive: true },
  { name: "Mehmet", age: 16, isActive: true },
];

const result = users.filter((user) => user.isActive && user.age > 18);

console.log(result);
