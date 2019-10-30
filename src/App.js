import React from 'react';
import './App.css';


const App = (props) => {
  const [input, setInput] = React.useState('');
  const [TAF, setTAF] = React.useState([]);
  const [line, setLine] = React.useState(['']);
  const [block, setBlock] = React.useState('');
  const newLine = /\n/;
  const newBlock = /\s/;

  const checkTAF = (e) => {
    console.log('========================> Checking Taf', input);
    splitTAF(input)
    console.log('========================>', line);
  }

  const splitTAF = (input) => {
    console.log('========================>', typeof input);
    const splittingLines = input.split(newLine)
    setLine(splittingLines)
    console.log('========================>', splittingLines);
    console.log('========================>', typeof splittingLines);
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>TAF Checker</div>
        <textarea className="TAFCheck" rows="10" cols="100" onChange={(e) => {handleChange(e)}}></textarea>
        <button onClick={(e)=>{checkTAF(e)}}>Check TAF</button>
      </header>
    </div>
  );
}


export default App;
