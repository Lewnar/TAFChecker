import React from 'react';
import './App.css';


const App = (props) => {
  const [input, setInput] = React.useState('');
  // const [output, setOutput] = React.useState([])
  const newLine = /\n/;
  const newBlock = /\s/;
  const firstLine = [/((TAF)|(TAF) ((AMD)|(COR)))/, /[A-Z]{4}/, /[0-9]{6}[Z]/, /[0-3][0-9][0-2][0-9][/][0-3][0-9][0-2][0-9]/, /([0-3][0-9][0]|(VRB))[0-9][0-9]((KT)|(G)[0-9][0-9](KT))/, /[0-9]{4}/, /((SKC)|([A-Z]{3}[0-9]{3})|((VV)[0-9]{3}))/, /(QNH)[0-9]{4}(INS)/]
  const otherLines = [/((BECMG)|(TEMPO))/, /([0-3][0-9][0-2][0-9][/][0-3][0-9][0-2][0-9])/, /(([0-9]{3}|(VRB))[0-9]{2}((KT)|(G)[0-9]{2}(KT)))/, /[0-9]{4}/, /((SKC)|(((FEW)|(SCT)|(BKN)|(OVC))[0-9]{3})|((VV)[0-9]{3}))/, /(QNH)[0-9]{4}(INS)/]
  const ending = [/((((TX)[0-9]{2})|((TXM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z))/, /(((((TN)[0-9]{2})|((TNM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z)))/]


  //onclick of check TAF causes this function to activate
  const checkTAF = (e) => {
    const split = splitTAF(input)
    const check = checkingTAF(split)
    const output = testFunc(split, check)
    createArea(output)
  }

  //function to split pharagraph into parts
  const splitTAF = (input) => {
    const splittingLines = input.split(newLine)
    const splittingBlock = []
    for (let line of splittingLines){
      const blockSplit = line.split(newBlock)
      //fliter Function was added to get rid of empty stings
      splittingBlock.push(cleaner(blockSplit))
    }
    return splittingBlock
  }

  //function that goes through the array and checks if anything is wrong or not there
  const checkingTAF = (split) => {
    let output = []
    for (let line in split){
      let index = parseInt(line)
      let tafRow = split[index]
      let checkerRow = []
      if(index === 0 && split.length-1 === index){
        checkerRow = firstLine.concat(ending)
      } else if(index === 0){
        checkerRow = firstLine
      } else if(split.length-1 === index) {
        checkerRow = otherLines.concat(ending)
      } else if(undefined) {
        console.log('========================> Do not understand');
      } else {
        checkerRow = otherLines
      }
      let fLineOutput = tafRow.map((item, index) => {
        if(checkerRow[index] && checkerRow[index].test(item)){
          return true
        } else {
          return false
        }
      })
      output.push(fLineOutput)
    }
    return output
  }

  const createArea = (output) => {
    var element = document.getElementById('output');
    element.innerHTML = ''
    element.appendChild(output);
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

  //func
  //  create new array
  //  loop through the loop split
  const testFunc = (split,check) => {
    let parent = document.createElement('div')
    for(let line in split){
      let rowElement = ''
      for(let block in split[line]){
        if(check[line][block]){
          rowElement = rowElement + " " + split[line][block]
        } else {
          rowElement = rowElement + " " + `<span style="background:red">${split[line][block]}</span>`
        }
      }
      let garbo = document.createElement('div')
      garbo.innerHTML = rowElement
      parent.appendChild(garbo)
    }
    return parent
  }

  return (
    <div className="App">
      <div className="TafWebpage">
        <div className="TafInput">
            <div>TAF Checker</div>
            <textarea className="TAFCheck" rows="10" cols="100" onChange={(e) => {handleChange(e)}}></textarea>
            <button onClick={(e)=>{checkTAF(e)}}>Check TAF</button>
        </div>
        <div id='p1' className="TafOutput">
          <p>Info Area</p>
          <div id={'output'}/>
        </div>
        <div className={'footer'}>       
          Copyright © By Shaun Lewis (2019 - 2020)
        </div>
      </div>
    </div>
  );
}


export default App
