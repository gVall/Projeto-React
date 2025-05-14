// React
import {useCallback, useEffect, useState} from "react";

// CSS
import './App.css';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// Data
import {wordsList} from "./data/words"

// Creates and stores different game stages

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "gameOver"},
]

function App() {
  // Controls the current stage of the game. It starts with the "Start" stage
  const [gameStage, setGameStage] = useState(stages[0].name);

  // List of available words for the game 
  const [words] = useState(wordsList);

  // The word randomly picked for the player to guess
  const [pickedWord, setPickedWord] = useState("");

  // The category of the picked word
  const [pickedCategory, setPickedCategory] = useState("");

  // Array containing the letters of the picked word
  const [letters, setLetters] = useState([]);

  // Letters the player has guessed correctly
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Letters the player has guessed incorrectly
  const [wrongLetters, setWrongLetters] = useState([]);

  // Number of guesses the player has left
  const [guesses, setGuesses] = useState(3);

  // Player's current score
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // Get all categories of list the words 
    const categories = Object.keys(words);

    // Randomly select a word and its specific category
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};

  }, [words])

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  const startGame = useCallback(() => {
    // Starts the game. Returns the chosen word and category, separates it into letters, changes the game stage...
    clearLetterStates();
    const {word, category} = pickWordAndCategory();
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setGameStage(stages[1].name);
    setLetters(wordLetters);
    setPickedCategory(category);
    setPickedWord(word);

  }, [pickWordAndCategory])

  // Handles letters entered by the player
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    // Check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    ) { return }

    // Checks if the letter is part of the word. If so, it is added to the array of correct words.
    // If not, it is added to the array of incorrect words, reducing the number of attempts until game over.

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter])
    } else {
      setWrongLetters((actualWrondLetters) => [...actualWrondLetters, normalizedLetter])
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
    console.log(letter);
  }

  useEffect(() => {
    // If the user miss all guesses, the stage of game is change for Game Over
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  const retry = () => {
    // Restart the game with all initial stats
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  }

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // Changes the score if all letters of the word were correct
    if (
      gameStage === "game" && 
      guessedLetters.length === uniqueLetters.length &&
      uniqueLetters.length > 0 
    ) {
      setScore((actualScore) => actualScore + 100);
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  return (
    // Each stage calls the respective component (passing functions and data)
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter = {verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters= {guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === 'gameOver' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
