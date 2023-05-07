import './startScreen.css'
const startScreen = ({StartGame}) => {
  return (
    <div className='start'>
       <h1>Secret Word</h1>
       <p>Clique no botão abaixo para iniciar</p>    
       <button onClick={StartGame}>Começar o Jogo</button>
       </div>
  )
}

export default startScreen