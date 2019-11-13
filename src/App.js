import React from 'react';
import './App.css';


const App = (props) => {
  const [input, setInput] = React.useState('');
  // const [output, setOutput] = React.useState([])
  const newLine = /\n/;
  const newBlock = /\s/;
  const TAF = /(TAF)/;
  const AMD = /(AMD)/
  const COR = /(COR)/
  const ICAO = /[A-Z]{4}/;
  const DATE = /[0-9]{6}[Z]/;
  const BECMG = /(BECMG)/;
  const TEMPO = /(TEMPO)/;
  const Time = /[0-3][0-9][0-2][0-9][/][0-3][0-9][0-2][0-9]/;
  const Wind = /([0-3][0-9][0]|(VRB))[0-9][0-9]((KT)|(G)[0-9][0-9](KT))/;
  const Vis = /((9999)|(9000)|(8000)|(7000)|(6000)|(5000)|(4800)|(4700)|(4500)|(4400)|(4000)|(3700)|(3600)|(3400)|(3200)|(3000)|(2800)|(2600)|(2400)|(2200)|(2000)|(1800)|(1700)|(1600)|(1500)|(1400)|(1300)|(1200)|(1100)|(1000)|(0900)|(0800)|(0700)|(0600)|(0500)|(0400)|(0300)|(0200)|(0100)|(0000)|([-]0200))/;
  const Weather = /((RA)|([-]RA)|([+]RA)|(SN)|([-]SN)|([+]SN)|(TS)|([-]TS)|([+]TS)|(TSRA)|([-]TSRA)|([+]TSRA))/;
  const Sky = /((SKC)|(((FEW)|(SCT)|(BKN)|(OVC))([0-9]{3}|[0-9]{3}(CB)))|((VV)[0-9]{3}))/;
  const Alt = /(QNH)[0-9]{4}(INS)/;
  const Ice = /(6)[0-9]{5}/;
  const Turb = /((5)[0-9]{5})/;
  const TX = /((((TX)[0-9]{2})|((TXM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z))/;
  const TN = /(((((TN)[0-9]{2})|((TNM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z)))/;
  const Error = '';


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

  //function for the first line of the TAF regex
  const buildRegexFirstLine = (firstLine) => {
    const fLine = firstLine[0].slice(1,2)
    let fLineOther = firstLine[0].slice(6)
    const lineContentWx = []
    const BeginningLine = []
    for (let bBlock of fLine){
      if(bBlock.match(AMD)){
        BeginningLine.push(TAF, AMD, ICAO, DATE, Time, Wind, Vis)
        fLineOther = firstLine[0].slice(7)
      } else if (bBlock.match(COR)){
        BeginningLine.push(TAF, COR, ICAO, DATE, Time, Wind, Vis)
        fLineOther = firstLine[0].slice(7)
      } else {
        BeginningLine.push(TAF, ICAO, DATE, Time, Wind, Vis)
      }
    }
    for (let block of fLineOther){
      if(block.match(Weather)){
        lineContentWx.push(Weather)
      } else if(block.match(Sky)){
        lineContentWx.push(Sky)
      } else if(block.match(Alt)){
        lineContentWx.push(Alt)
      } else if(block.match(Ice)){
        lineContentWx.push(Ice)
      } else if(block.match(Turb)){
        lineContentWx.push(Turb)
      } else if(block.match(TX)){
        lineContentWx.push(TX)
      } else if(block.match(TN)){
        lineContentWx.push(TN)
      } else {
        lineContentWx.push(Error)
      }
    }
    let Line = BeginningLine.concat(lineContentWx)
    return Line
  }

  //building other Lines of the TAF regex
  const buildRegexOtherLine = (line) => {
    const fBlock = line.slice(0,1)
    let lineContent = []
    const oLineInit = []
    for(let other of fBlock){
      let otherLineRegex = line.slice(4)
      if(other.match(BECMG)){
        oLineInit.push(BECMG, Time, Wind, Vis)
        for (let Block of otherLineRegex){
          if(Block.match(Weather)){
            lineContent.push(Weather)
          } else if(Block.match(Sky)){
            lineContent.push(Sky)
          } else if(Block.match(Alt)){
            lineContent.push(Alt)
          } else if(Block.match(Ice)){
            lineContent.push(Ice)
          } else if(Block.match(Turb)){
            lineContent.push(Turb)
          } else if(Block.match(TX)) {
            lineContent.push(TX)
          } else if (Block.match(TN)){
            lineContent.push(TN)
          } else {
            lineContent.push(Error)
          }
        }
      } else {
        oLineInit.push(TEMPO, Time)
        otherLineRegex = line.slice(2)
        for (let Block of otherLineRegex){
          if(Block.match(Wind)){
            lineContent.push(Wind)
          } else if(Block.match(Vis)){
            lineContent.push(Vis)
          } else if(Block.match(Weather)){
            lineContent.push(Weather)
          } else if(Block.match(Sky)){
            lineContent.push(Sky)
          } else if(Block.match(Alt)){
            lineContent.push(Alt)
          } else if(Block.match(Ice)){
            lineContent.push(Ice)
          } else if(Block.match(Turb)){
            lineContent.push(Turb)
          } else if(Block.match(TX)) {
            lineContent.push(TX)
          } else if (Block.match(TN)){
            lineContent.push(TN)
          } else {
            lineContent.push(Error)
          }
        }
      }
    }
    let Data = oLineInit.concat(lineContent)
    return Data
  }

  const checkForSpecialCase = (block, lineNumber) => {
    if(block.match(Time) && block.length === 9 && lineNumber === 0){
      const hour1 = parseInt(block.slice(2,4))
      const hour2 = parseInt(block.slice(7))
      if((24 - hour1)+hour2 === 30){
         return true
      } else {
        return false
      }
    // } else if(block.match(Sky)){
    //   const layOut = block
    //   console.log('========================>', layOut);
    }
    return true
  }

  //function that goes through the array and checks if anything is wrong or not there
  const checkingTAF = (split) => {
    let output = []
    const regexFirst = buildRegexFirstLine(split)
    for (let line in split){
      let index = parseInt(line)
      let tafRow = split[index]
      let checkerRow = []
      if(index === 0){ //First TAF Line
        checkerRow = regexFirst
      } else { //General Other TAF line
        checkerRow = buildRegexOtherLine(tafRow)
      }
      let fLineOutput = tafRow.map((item, mapIndex) => {
        const specialCase = checkForSpecialCase(item, index)
        if(checkerRow[mapIndex] && checkerRow[mapIndex].test(item) && specialCase){
          return true
        } else {
          return false
        }
      })
      output.push(fLineOutput)
    }
    return output
  }

  //Function that sets up an area to be pushed to user
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
      if(line>0){
        garbo.classList.add('indent')
      }
      garbo.innerHTML = rowElement
      parent.appendChild(garbo)
    }
    return parent
  }

  //pushes the content to the user
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


  return (
    <div className="App">
      <div className="Header">TAF Checker</div>
      <div className="Taf-Webpage">
        <div className="Taf-Input">
            <textarea className="TAF-Check" rows="10" cols="100" onChange={(e) => {handleChange(e)}}></textarea>
        </div>
        <div className="taf-button">
            <button className="button" onClick={(e)=>{checkTAF(e)}}>Check Taf</button>
        </div>
        <div id='p1' className="Taf-Output">
          <p>Info Area</p>
          <div id={'output'} className="App-text"/>
        </div>
      </div>
      <div className={'footer'}>       
        Copyright © By Shaun Lewis (2019 - 2020)
      </div>
    </div>
  );
}


export default App
