const words = ["apple", "banana", "cherry", "strawberry"];

const longestWord = words.reduce((lognest, current) => {
  return current.length > lognest.length ? current : lognest;
}, "");

console.log(longestWord);
