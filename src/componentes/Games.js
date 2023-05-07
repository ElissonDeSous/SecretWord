import './game.css'
import { useState,useRef } from 'react'

const Game = ({VerifyLetter,escolhaLetras ,letras,categoria,LetrasAdvinhar,letrasErradas,chances,Score}) => {

  const [letter,setLetter] = useState('')
  const letterInputRef = useRef (null)

  const escolhaLetra = (e) =>{
     e.preventDefault()
     VerifyLetter(letter)
     setLetter("")
     letterInputRef.current.focus()
  }
  return (
    <div className='game'>
      <p className='pontos'>
      <span>Pontuação: {Score}</span>
      </p>
      <h1>Advinha a palavra</h1>

      <h3 className='dica'>
        dica da palavra: <span>{categoria}</span>
        </h3>
        <p>voce ainda tem {chances} tentativa(s)</p>

    <div className='word-container'>
      {
        letras.map((letras, i )=> (
            LetrasAdvinhar.includes(letras) ? (
              <span key={i} className = "letra">
                {letras}
              </span>  
            ): (
              <span key={i} className = "quadroEmBranco"></span>
            )

        ))
      }
    </div>

    <div className='letraContainer'>
       <p>Tente advinhar a letra da palavra:</p>
       <form onSubmit={escolhaLetra}>
         <input type="txt" name="letra" maxLength="1" required onChange={(e) => setLetter(e.target.value)  } value = {letter} ref = {letterInputRef} />
         <button >Jogar</button>
       </form>
       <div className='letrasJaUsadas'>
     <p>Letras ja utilizadas:</p>
     {
      letrasErradas.map((letras, i) => (
        <span key={i}>{letras}, </span>
      ))
     }
       </div> 
    </div>
    </div>
  )
}

export default Game