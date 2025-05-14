import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  // When the button is clicked the prop startGame is called
  return (
    <div className="start">
        <h1>Secret World</h1>
        <p>Clique no botaão abaixo para começar a jogar</p>
        <button onClick={startGame}>INICIAR O JOGO</button>
    </div>
  )
}

export default StartScreen