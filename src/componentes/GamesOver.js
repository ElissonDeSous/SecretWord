import './gamerOver.css'
const GamesOver = ({Reiniciar,Score}) => {
  return (
    <div>
      <h1>GamesOver</h1>
      <h2>sua pontuação foi : <span>{Score}</span> </h2>
      <button onClick={Reiniciar} >Reiniciar</button>
    </div>
  )
}

export default GamesOver