// Goal: Use map() on an array of user objects to create a new array that contains each user's full name and calculated age.

const users = [
  { firstName: "Ali", lastName: "Veli", birthYear: 1990 },
  { firstName: "Ayşe", lastName: "Kara", birthYear: 1985 },
  { firstName: "Mehmet", lastName: "Demir", birthYear: 2000 },
  { firstName: "Fatma", lastName: "Yıldız", birthYear: 1995 },
];

const currentYear = new Date().getFullYear();

const fullNameAge = users.map((full) => ({
  Name: `${full.firstName} ${full.lastName}`,
  Age: currentYear - full.birthYear,
}));

console.log(fullNameAge);
