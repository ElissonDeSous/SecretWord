import './App.css';
import Start  from './componentes/startScreen'
import Games from './componentes/Games'
import GamesOver from './componentes/GamesOver'
import { useCallback,useEffect,useState } from 'react';
import {wordsList} from './data/world'


const estagios = [
  {id:1,name : 'start'},
  {id:2,name : 'game'},
  {id:3,name : 'end'},
]
function App() {
  const [gameEstagios, setEstagio] = useState(estagios[0].name)
  const [words] = useState(wordsList)
  const [escolha, setEscolha] = useState("")
  const [escolhaCategory, setEscolhaCategory] = useState("")
  const [letras , setLetras] = useState([])
  const [letrasAdivinha,setLetrasAdivinha] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [Chances,setChances] = useState(3)
  const [score , setScore] = useState(0)

  const escolhacategory = useCallback( () =>{
    // escolha aleatoria a categoria
    const Categoria = Object.keys(words)
    const category = Categoria[(Math.floor(Math.random()*Object.keys(Categoria).length))]

    const word = words[category][Math.floor(Math.random()* words[category].length)]

    return{category ,word}
  },[words])
  
  const StartGame = useCallback( () =>{
    clearLettersStates();
    const {category,word} = escolhacategory()
  
    // criar lista de letras
    let wordLetras = word.split("")
    wordLetras = wordLetras.map((i)=> i.toLowerCase())
    
    setEscolhaCategory(category)
    setEscolha(word)
    setLetras(wordLetras)
    setEstagio(estagios[1].name)
  },[escolhacategory])

  const VerifyLetter = (LetrasAdvinhar) =>{
    const normalizeLetter = LetrasAdvinhar.toLowerCase()
    if(letrasAdivinha.includes(normalizeLetter) || letrasErradas.includes(normalizeLetter))
    {
        return;
    }

    if(letras.includes(normalizeLetter))
    {
       setLetrasAdivinha((actualletrasAdivinha)=> [
        ...actualletrasAdivinha,
        LetrasAdvinhar,
       ])
    }else{
      setLetrasErradas((actualletrasErradas) => [
        ...actualletrasErradas,
        normalizeLetter,
      ])

      setChances((actualChances) => actualChances -1);
    }
    
  }

  const  clearLettersStates = () =>{
    setLetrasAdivinha([])
    setLetrasErradas([])
  } 
  useEffect(() =>{
  
  if(Chances <= 0)
  {

    clearLettersStates();
    setEstagio(estagios[2].name)
  }
  
 },[Chances])

useEffect(()=> {
  
   const Letrasunicas = [...new Set(letras)]
   
   if(letrasAdivinha.length === Letrasunicas.length && gameEstagios === estagios[1].name)
   {
    setScore((actualScore) => (actualScore += 100))

    StartGame()
    
   }
   

} ,[letrasAdivinha,letras,StartGame])
  const reiniciar = ()=> {

    setScore()
    setChances(3)
    setEstagio(estagios[0].name)
  }

  return (
    <div className="App">
    {gameEstagios === 'start'&& <Start StartGame = {StartGame}/>}


    {gameEstagios === 'game' && <Games
     VerifyLetter = {VerifyLetter}
     escolhaLetras = {escolha}
     letras = {letras}
     categoria = {escolhaCategory}
     LetrasAdvinhar = {letrasAdivinha}
     letrasErradas = {letrasErradas}
     chances = {Chances}
     Score = {score}/>}


    {gameEstagios === 'end' && <GamesOver Reiniciar =  {reiniciar} Score = {score}/>}
    </div>
  );
}

export default App;
