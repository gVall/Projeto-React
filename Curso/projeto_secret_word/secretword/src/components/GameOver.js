import "./GameOver.css"

const GameOver = ({retry, score}) => {
  // Shows Score and restart the game after the click on button
  return (
    <div className="game_over">
      <h1>Game Over</h1>
      <h2>Score: <span>{score}</span></h2>

      <button onClick={retry}>RECOMEÇAR</button>
    </div>
  )
}

export default GameOver