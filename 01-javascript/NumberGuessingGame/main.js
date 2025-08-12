const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let attempts = 0;
let guess;
let running = true;

while (running) {
  guess = parseInt(
    prompt(`Guess a number between ${minNum} and ${maxNum}:`),
    10
  );

  if (isNaN(guess)) {
    alert("Please enter a valid number.");
    continue;
  }

  attempts++;

  if (guess < minNum || guess > maxNum) {
    alert(
      `Your guess is out of bounds! Please guess a number between ${minNum} and ${maxNum}.`
    );
  } else if (guess < answer) {
    alert("Too low! Try again.");
  } else if (guess > answer) {
    alert("Too high! Try again.");
  } else {
    alert(
      `Congratulations! You've guessed the number ${answer} in ${attempts} attempts.`
    );
    running = false;
  }
}
alert("Thanks for playing the Number Guessing Game!");
console.log(`The answer was: ${answer}`);
