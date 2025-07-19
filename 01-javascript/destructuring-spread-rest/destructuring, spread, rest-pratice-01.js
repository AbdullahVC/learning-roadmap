const user = {
  name: "Abdullah",
  age: 30,
  country: "Türkiye",
  job: "Developer",
  isActive: true,
};

const { name, age, ...others } = user;

console.log(name);
console.log(age);
console.log(others);

const updatedUser = {
  name: "Ahmet",
  age: 40,
  ...others,
};

console.log(updatedUser);
