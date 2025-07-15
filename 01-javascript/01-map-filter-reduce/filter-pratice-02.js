//Goal: Filter all strings that start with the letter "A" (case insensitive).

const names = ["Alice", "bob", "Andrew", "carol", "adam"];

const result = names.filter((name) => name[0].toLowerCase() === "a");

console.log(result);
