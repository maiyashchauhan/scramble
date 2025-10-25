// 🧠 Word Scramble Game (Ends on Wrong Answer)
// Run using: node word_scramble.js

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

let score = 0;
let level = "";
let wordList = [];

// Word bank by difficulty
const words = {
  easy: ["dog", "sun", "book", "pen", "tree", "milk", "fish", "bird", "game"],
  medium: ["python", "school", "window", "mobile", "flower", "planet", "travel"],
  hard: ["javascript", "developer", "algorithm", "function", "computer", "variable", "keyboard"]
};

// Shuffle letters of a word
function shuffleWord(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

// Choose difficulty level
function chooseLevel() {
  console.log("🧩 Welcome to the Word Scramble Game!");
  console.log("Choose difficulty level:");
  console.log("1. Easy\n2. Medium\n3. Hard");

  readline.question("Enter your choice (1/2/3): ", (choice) => {
    if (choice === "1") level = "easy";
    else if (choice === "2") level = "medium";
    else if (choice === "3") level = "hard";
    else {
      console.log("❌ Invalid choice! Try again.\n");
      return chooseLevel();
    }

    wordList = [...words[level]];
    console.log(`\n🎮 You selected '${level.toUpperCase()}' mode!\n`);
    startGame();
  });
}

// Start the game
function startGame() {
  if (wordList.length === 0) {
    console.log(`🏆 All words done! Final Score: ${score}`);
    return playAgain();
  }

  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  const scrambled = shuffleWord(randomWord);

  console.log(`🔤 Scrambled word: ${scrambled}`);

  readline.question("Your guess: ", (guess) => {
    if (guess.toLowerCase() === randomWord.toLowerCase()) {
      const points = level === "easy" ? 10 : level === "medium" ? 20 : 30;
      score += points;
      console.log(`✅ Correct! +${points} points (Total: ${score})\n`);
      wordList = wordList.filter((w) => w !== randomWord); // remove used word
      startGame(); // next word
    } else {
      console.log(`❌ Wrong! The correct word was: "${randomWord}".`);
      console.log(`🏁 Game Over! Final Score: ${score}`);
      playAgain();
    }
  });
}

// Ask to replay
function playAgain() {
  readline.question("\nPlay again? (y/n): ", (ans) => {
    if (ans.toLowerCase() === "y") {
      score = 0;
      chooseLevel();
    } else {
      console.log("👋 Thanks for playing!");
      readline.close();
    }
  });
}

// Start game
chooseLevel();
