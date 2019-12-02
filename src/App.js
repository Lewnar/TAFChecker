import React from 'react';
import './App.css';


const App = (props) => {
  const [input, setInput] = React.useState('');
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
  const Weather = /((NSW)|(RA)|([-]RA)|([+]RA)|(SHRA)|([-]SHRA)|([+]SHRA)|(VCSH)|(TS)|([-]TS)|([+]TS)|(TSRA)|([-]TSRA)|([+]TSRA)|(SN)|([-]SN)|([+]SN))/;
  const Sky = /((SKC)|(((FEW)|(SCT)|(BKN)|(OVC))([0-9]{3}|[0-9]{3}(CB)))|((VV)[0-9]{3}))/;
  const SKC = /(SKC)/;
  const Alt = /(QNH)[0-9]{4}(INS)/;
  const Ice = /(6)[0-9]{5}/;
  const Turb = /((5)[0-9]{5})/;
  const TX = /((((TX)[0-9]{2})|((TXM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z))/;
  const TN = /(((((TN)[0-9]{2})|((TNM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z)))/;
  const Error = '';
  let skc = false;
  let skyBlockPerLine = 0;
  let Becoming = false;



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
    let lineContentWx = []
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
    lineContentWx = WeatherBECMGCheck(fLineOther)
    console.log('========================>', lineContentWx);
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
        lineContent = WeatherBECMGCheck(otherLineRegex)
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

  //to make sure that the line stays in order.
  const WeatherBECMGCheck = (line) => {
    const lineContent = []
    let wTest = true
    let sTest = true
    let iTest = true
    let tTest = true
    let aTest = true
    let TXTest = true
    let TNTest = true
    for(let block of line){
      if(wTest === true){
        if (block.match(Weather)){
          lineContent.push(Weather)
        } else {
          wTest = false
        }
      }

      if(wTest === false && sTest === true){
        if(block.match(Sky)){
          lineContent.push(Sky)
        } else {
          sTest = false
        }
      }

      if(sTest === false && iTest === true){
        if(block.match(Ice)){
          lineContent.push(Ice)
        } else {
          iTest = false
        }
      }

      if(iTest === false && tTest === true){
        if(block.match(Turb)){
          lineContent.push(Turb)
        } else {
          tTest = false
        }
      }

      if(tTest === false && aTest === true){
        if(block.match(Alt)){
          lineContent.push(Alt)
        } else {
          aTest = false
        }
      }

      if(aTest === false && TXTest === true){
        if(block.match(TX)){
          lineContent.push(TX)
        } else {
          TXTest = false
        }
      }

      if(TXTest === false && TNTest === true){
        if(block.match(TN)){
          lineContent.push(TN)
        } else {
          TNTest = false
          lineContent.push(Error)
        }
      }
    }
    return lineContent
  }

  const checkForSpecialCase = (block, lineNumber, skyBlock) => {
    
    if(block.match(Time) && block.length === 9 && lineNumber === 0){
      const hour1 = parseInt(block.slice(2,4))
      const hour2 = parseInt(block.slice(7))
      const date1 = block.slice(0,2)
      const date2 = block.slice(5,7)
      if(date2 - date1 === 2){
        if((24 - hour1)+hour2 + 24 === 30){
          return true
       } else {
         return false
       }
      } else {
        if((24 - hour1)+hour2 === 30){
           return true
        } else {
          return false
        }
      }
    } 

    if(block.match(BECMG)){
      Becoming = true
      skc = false
    }
    if(Becoming === true && block.match(Time) && block.length === 9 && lineNumber !== 0){
      Becoming = false
      const hour1 = parseInt(block.slice(2,4))
      const hour2 = parseInt(block.slice(7))
      const date1 = block.slice(0,2)
      const date2 = block.slice(5,7)
      if(date2 - date1 === 1){
        if(hour2 === 0 && hour1 === 23){
          return true
       } else {
         return false
       }
      } else {
        if(hour2 - hour1 === 1){
           return true
        } else {
          return false
        }
      }
    }

    if(block.match(Wind)){
      const dir = block.slice(0, 3)
      const spd1 = block.slice(3, 5)
      const spd2 = block.slice(6, 8)
      console.log('========================>', dir);
      console.log('========================>', spd1);
      console.log('========================>', spd2);
      if(dir === 'VRB' && spd1 !== '00' && spd1 <= 6){
        return true
      } else if(dir === 'VRB' && spd1 >= 25){
        console.log('========================>Thunderstorm');
      } else if(dir === 'VRB' && spd1 === '00' || spd1 > 6){
        return false
      }
      
    }

    if(block.match(SKC)){
      skc = true
    }
    if(!block.match(SKC) && skc === true && block.match(Sky)){
      return false
    }
    // if(block.match(Sky)){
    //   skyBlockPerLine++
    //   const layOut = block
    //   // console.log('========================>', layOut , lineNumber);
    //   console.log('========================>', skyBlockPerLine);
    //   if(block.match(skySKC) && skyBlockPerLine === 1){
    //     return true
    //   } else if(block.match(skyVV) && skyBlockPerLine === 1){
    //     return true
    //   } else if(skyBlockPerLine > 1){
    //     console.log('========================>Function Time');
    //   } else {
    //     return true
    //   }
    // }
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
      skyBlockPerLine = 0
      if(index === 0){ //First TAF Line
        checkerRow = regexFirst
      } else { //General Other TAF line
        checkerRow = buildRegexOtherLine(tafRow)
      }
      let fLineOutput = tafRow.map((item, mapIndex) => {
        const specialCase = checkForSpecialCase(item, index, skyBlockPerLine)
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
