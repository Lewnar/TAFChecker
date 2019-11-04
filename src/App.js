import React from 'react';
import './App.css';


const App = (props) => {
  const [input, setInput] = React.useState('');
  const newLine = /\n/;
  const newBlock = /\s/;
  const firstLine = [/((TAF)|(TAF) ((AMD)|(COR)))/, /[A-Z]{4}/, /[0-9]{6}[Z]/, /[0-3][0-9][0-2][0-9][/][0-3][0-9][0-2][0-9]/, /([0-3][0-9][0]|(VRB))[0-9][0-9]((KT)|(G)[0-9][0-9](KT))/, /[0-9]{4}/, /((SKC)|([A-Z]{3}[0-9]{3})|((VV)[0-9]{3}))/, /(QNH)[0-9]{4}(INS)/]
  const otherLines = [/((BECMG)|(TEMPO))/, /([0-3][0-9][0-2][0-9][/][0-3][0-9][0-2][0-9])/, /(([0-9]{3}|(VRB))[0-9]{2}((KT)|(G)[0-9]{2}(KT)))/, /[0-9]{4}/, /((SKC)|([A-Z]{3}[0-9]{3})|((VV)[0-9]{3}))/, /(QNH)[0-9]{4}(INS)/]
  const ending = [/((((TX)[0-9]{2})|((TXM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z))/, /(((((TN)[0-9]{2})|((TNM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z)))/]


  //onclick of check TAF causes this function to activate
  const checkTAF = (e) => {
    console.log('========================> Checking Input', input);
    const split = splitTAF(input)
    const check = checkingTAF(split)
  }

  //function to split pharagraph into parts
  const splitTAF = (input) => {
    console.log('========================>Splitting Into Blocks');
    const splittingLines = input.split(newLine)
    const splittingBlock = []
    for (let line of splittingLines){
      const blockSplit = line.split(newBlock)
      //fliter Function was added to get rid of empty stings
      splittingBlock.push(cleaner(blockSplit))
    }
    console.log('========================>', splittingBlock);
    return splittingBlock
  }

  //function that goes through the array and checks if anything is wrong or not there
  const checkingTAF = (split) => {
    console.log('========================>Checking TAF Function');
    console.log('========================>', split.length);
    let output = []
    for (let line in split){
      let index = parseInt(line)
      let tafRow = split[index]
      let checkerRow = []
      console.log('========================>', typeof line);
      console.log('========================>', split.length-1 === line);
      if(index === 0 && split.length-1 === index){
        checkerRow = firstLine.concat(ending)
      } else if(index === 0){
        checkerRow = firstLine
        console.log('========================> first line');
      } else if(split.length-1 === index) {
        checkerRow = otherLines.concat(ending)
        console.log('========================>lastRow');
      } else {
        checkerRow = otherLines
        console.log('========================> this is a boring row');
      }
      let fLineOutput = tafRow.map((item, index) => {
        console.log('========================>', checkerRow[index]);
        if(checkerRow[index].test(item)){
          return true
        } else {
          return false
        }
      })
      output.push(fLineOutput)
    }
    console.log('========================>output', output);
  }

  //allows for a change to state while typing into an area
  const handleChange = (event) => {
    setInput(event.target.value)
  }

  //filter to get rid of items that are not needed
  const cleaner = (array) => {
    return array.filter(object => {
        return (object !== '')
    })
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
