import Dice from "./components/Dice";
import {useState, useEffect} from "react";
import {nanoid} from "nanoid"
import Confetti from "react-confetti";

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  // useEffect(() => {
  //   const a=dice[0].value;
  //   let ok=true;
  //   for(let i = 1; i <= 9; i++) {
  //     if(a!==dice[i].value)
  //     {
  //       console.log(a!==dice[i].value);
  //       ok=false;
  //     }
  //   }
  //   if(ok)
  //   {setTenzies(oldTenzies => !oldTenzies)
  //   console.log("You won");}
  // }, dice)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue)
    {
      setTenzies(true)
      console.log('You won');
    }
  }, dice)

  function allNewDice() {
    const array = []
    for(let i = 0; i <= 9; i++){
      array.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return array;
  }

  function rollDice(){
    if(tenzies)
    {
      setDice(allNewDice())
      setTenzies(false)
    }
    else
    setDice(oldDice =>
      oldDice.map(die =>
        die.isHeld?
        die:
        {...die, value: Math.ceil(Math.random() * 6)}
      ))
  }

  function holdDice(id){
    setDice(oldDice => 
      oldDice.map(die =>
        die.id === id ?
        {...die, isHeld:!die.isHeld}:
        die
      )
    )
  }

  const diceElements = dice.map(die => 
    <Dice key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} handleClick={() => holdDice(die.id)}/>
  )

  return (
    <div className="App">
      {tenzies && <Confetti width={'360px'} height={'380px'}/>}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {diceElements}
        </div>
        <button className = "roll-dice" onClick={rollDice}>{tenzies? 'New Game': 'Roll'}</button>
      </main>
    </div>
  );
}

export default App;
