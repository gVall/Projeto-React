import { useState, useRef } from "react"
import "./Game.css"

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  // When button is clicked the letter is validated 
  const handleSubmit = (e) => {
    // Prevents the page from reloading
    e.preventDefault();
    // Check the letter
    verifyLetter(letter);
    // Clean the space
    setLetter("");
    // Automatically repositions the cursor in the text field
    letterInputRef.current.focus();

  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      {/*Shows blank spaces or fills in the spaces with the correct letters*/}
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (<span key={i} className="letter">{letter}</span>) : (<span key={i} className="blankSquare"></span>)
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        {/*Form for user insert one letter*/}
        <form onSubmit={handleSubmit}>
          {/*Allows only letters with or without accent*/}
          <input type="text" name="letter" ref={letterInputRef} maxLength="1" required onChange={(e) => (/^[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ]?$/.test(e.target.value) && setLetter(e.target.value))} value={letter} />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        {/*Shows array of wrong letters*/}
        {wrongLetters.map((letter, i) => 
        <span key={i}>{letter}, </span>
        )}
        
      </div>
    </div>
  )
}

export default Game