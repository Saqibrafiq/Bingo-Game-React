import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { start } from "./Confetti";

const that=this;
function Confetti() {
 
  
  useEffect(() => {
      start();
  });
  return <canvas id="canvas" />;
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}


const bingo = [
  "Took a walking meeting via phone",
  "Can you hear me?",
  "Joked about how long your 'commute is",
  "Said 'lol' and meant it",
  "Had a meeting interrupted by a pet or family member",
  "Wore pajama bottoms to a video meeting",
  "Spotted a pet in background on a meeting",
  "Did household chores on your lunch break",
  "Drank a glass of water",
  "Took a quick stroll to stretch your legs",
  "Sent a gif to a co-worker",
  "Took a coffee break.. or three",
  "Covid-19 Pandemic",
  "Did eye strain relief exercises",
  "Sorry i was on mute",
  "Can everyone see my screen?",
  "Set up working hours",
  "Used an emoji in an email",
  "Installed a blue light blocker on your computer",
  "Created a makeshift (standing desk)",
  "Tried the pomodoro techniqui",
  "Did chair yoga",
  "Worked from your balcony",
  "Took a typing speed test for fun",
  "Created a workday playlist"
];

const data = bingo.reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

function refreshPage() {
  window.location.reload(false);
} 

function App() {
  const [state, setState] = useState({ checked: {12:true} });
  
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id => {
    if(id !=12){
      setState(state => {
        const checked = { ...state.checked, [id]: !state.checked[id] };
        console.log(checked)

        const won = isWon(checked);
        
        return {
          ...state,
          checked,
          won
        };
    });
      }
 
    };

  return (
    <div className="App">
      <div>
      <h1> Bingo Game </h1>

      </div>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
        <button  onClick={  refreshPage }>
      Reload Game
      </button>
      </div>
      {state.won ? <Confetti /> : null}
      
    </div>
    
  );
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
