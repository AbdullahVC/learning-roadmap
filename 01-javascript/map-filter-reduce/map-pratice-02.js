//Goal: Use map() on a string array, convert each name to uppercase, and write the number of characters in that name.

const names = ["ahmet", "mahmut", "mustafa", "abdullah"];

const namesUpper = names.map(
  (name) => `${name.toUpperCase()} (${name.length} karakter)`
);

console.log(namesUpper);
