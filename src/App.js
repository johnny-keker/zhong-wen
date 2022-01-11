import React from 'react';
import logo from './logo.svg';
import './App.css';

class SizeButton extends React.Component {

  state = {
    isSelected: false,
    isDisabled: false
  }

  setSelected = () => {
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render() {
    const { size, app, type } = this.props;
    return (
      <button
        id="sizeButton"
        className= {this.state.isSelected ? 'sizeButton selected ' + type : 'sizeButton ' + type}
        disabled={this.state.isDisabled}
        onClick={() => {
          if (type == 0)
          {
            if (app.state.vowelButton != null) app.state.vowelButton.setSelected();
            app.setState({"vowel" : size})
            app.state.vowelButton = this;
            app.selectVowel(size);
          }
          else if (type == 1)
          {
            if (app.state.consonantButton != null) app.state.consonantButton.setSelected();
            app.setState({"consonant" : size})
            app.state.consonantButton = this;
          }
          else
          {
            if (app.state.toneButton != null) app.state.toneButton.setSelected();
            app.setState({"tone" : size})
            app.state.toneButton = this;
          }
          this.setSelected();
          console.log(size);
        }}
      >
        {size}
      </button>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vowel: "",
      consonant: "",
      text: "",
      tone: 0,
      info: require('./data.json'),
      vowelButton: null,
      consonantButton: null,
      toneButton: null
    };
  }

  selectVowel(vowel) {
    let consButtons = Array.from(document.getElementsByClassName('sizeButton 1'));
    let toneButtons = Array.from(document.getElementsByClassName('sizeButton 2'));
    let possible = this.state.info["data"].filter((obj) => {return obj.vowel === vowel});
    consButtons.forEach(button => {
      // disable consonants, that cannot be used with selected vowel
      button.disabled = possible.filter((y) => {return y.consonant === button.textContent}).length === 0;
    });
    toneButtons.forEach(button => {
      // disable consonants, that cannot be used with selected vowel
      button.disabled = possible.filter((y) => {return y.tone == button.textContent && y.consonant === this.state.consonant}).length === 0;
    });
  }
  
  render() {
    return (
      <div>
      <h3>Vowel</h3>
      <hr />
      <div>
        <SizeButton size="a" app={this} type={0} />
        <SizeButton size="ai" app={this} type={0} />
        <SizeButton size="ang" app={this} type={0} />
        <SizeButton size="ao" app={this} type={0} />
        <SizeButton size="e" app={this} type={0} />
        <SizeButton size="ei" app={this} type={0} />
        <SizeButton size="en" app={this} type={0} />
        <SizeButton size="eng" app={this} type={0} />
        <SizeButton size="er" app={this} type={0} />
        <SizeButton size="i" app={this} type={0} />
        <SizeButton size="ia" app={this} type={0} />
        <SizeButton size="ian" app={this} type={0} />
        <SizeButton size="iang" app={this} type={0} />
        <SizeButton size="iao" app={this} type={0} />
        <SizeButton size="ie" app={this} type={0} />
        <SizeButton size="in" app={this} type={0} />
        <SizeButton size="ing" app={this} type={0} />
        <SizeButton size="iong" app={this} type={0} />
        <SizeButton size="iou" app={this} type={0} />
        <SizeButton size="o" app={this} type={0} />
        <SizeButton size="ong" app={this} type={0} />
        <SizeButton size="ou" app={this} type={0} />
        <SizeButton size="u" app={this} type={0} />
        <SizeButton size="ua" app={this} type={0} />
        <SizeButton size="uai" app={this} type={0} />
        <SizeButton size="uan" app={this} type={0} />
        <SizeButton size="uang" app={this} type={0} />
        <SizeButton size="uei" app={this} type={0} />
        <SizeButton size="uen" app={this} type={0} />
        <SizeButton size="ueng" app={this} type={0} />
        <SizeButton size="uo" app={this} type={0} />
        <SizeButton size="ü" app={this} type={0} />
        <SizeButton size="üan" app={this} type={0} />
        <SizeButton size="üe" app={this} type={0} />
        <SizeButton size="ün" app={this} type={0} />
      </div>
      
      <h3>Consonant</h3>
      <hr />
      <div>
        <SizeButton size="b" app={this} type={1}/>
        <SizeButton size="p" app={this} type={1}/>
        <SizeButton size="m" app={this} type={1}/>
        <SizeButton size="f" app={this} type={1}/>
        <SizeButton size="d" app={this} type={1}/>
        <SizeButton size="t" app={this} type={1}/>
        <SizeButton size="n" app={this} type={1}/>
        <SizeButton size="l" app={this} type={1}/>
        <SizeButton size="g" app={this} type={1}/>
        <SizeButton size="k" app={this} type={1}/>
        <SizeButton size="h" app={this} type={1}/>
        <SizeButton size="j" app={this} type={1}/>
        <SizeButton size="q" app={this} type={1}/>
        <SizeButton size="x" app={this} type={1}/>
        <SizeButton size="z" app={this} type={1}/>
        <SizeButton size="s" app={this} type={1}/>
        <SizeButton size="c" app={this} type={1}/>
        <SizeButton size="zh" app={this} type={1}/>
        <SizeButton size="ch" app={this} type={1}/>
        <SizeButton size="sh" app={this} type={1}/>
        <SizeButton size="r" app={this} type={1}/>
      </div>
      <h3>Tone</h3>
      <hr />
      <div>
        <SizeButton size="1" app={this} type={2}/>
        <SizeButton size="2" app={this} type={2}/>
        <SizeButton size="3" app={this} type={2}/>
        <SizeButton size="4" app={this} type={2}/>
      </div>
    </div>
    );
  }

  // openFile = async () => {
  //   const rawFile = await readFileAsync(this.refs.file.files[0]);
  //   const text = arrayBufferToString(rawFile);
  //   const charMap = countChars(text);
  //   const [charInfo, entropy] = getCharInfoAndEntropy(charMap);
  //   const pairEntropy = getPairsEntropy(text, charInfo);
  //   const texTable = exportTex(charInfo);
  //   this.setState({ charInfo : charInfo, fileEntropy : entropy, pairEntropy : pairEntropy, texTable : texTable });
  // }

}

// function exportTex(charInfo) {
//   var texTable = [];
//   texTable.push("\\begin{tabular}{ | l | l | l | }");
//   texTable.push("\\hline");
//   texTable.push("Символ & Вероятность & Энтропия \\\\"); 
//   texTable.push("\hline");
//   Object.entries(charInfo).forEach(([char, info]) => {
//     texTable.push(`${char} & ${info[0].toFixed(4)} & ${info[1].toFixed(4)} \\\\`);
//   });
//   texTable.push("\\hline");
//   texTable.push("\\end{tabular}");
//   return texTable;
// }

// function readFileAsync(file) {
//   return new Promise((resolve, reject) => {
//     let reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsArrayBuffer(file);
//   });
// }

// function arrayBufferToString(arrayBuffer) {
//   return new TextDecoder('utf-8').decode(arrayBuffer);
// }

// function countChars(fileContents) {
//   var charMap = {};
//   fileContents.split("").forEach(c => {
//     c = c.toLowerCase();                    // translate every char to lower case to make code case insensitive
//     if (!c.match(/[a-z0-9]/i) && c !== " ") // checking if char is a punctuation
//       c = '.';
//     if (c == "\n")                          // removing newline symbols
//       return;
//     if (charMap[c] !== undefined)           // adding char to map
//       charMap[c]++;
//     else
//       charMap[c] = 1;
//   });
//   return charMap;
// }

// function getCharInfoAndEntropy(charMap) {
//   var probMap = {};
//   var entropy = 0;
//   const size = Object.values(charMap).reduce((a, b) => a + b, 0);
//   Object.entries(charMap).forEach(([char, frequency]) => {
//     var prob = frequency / size;                                  // calculating current char probability
//     probMap[char] = [prob, Math.log(1 / prob)];                   // setting probability and entropy for char
//     entropy -= prob * Math.log(prob);                             // updating file entropy
//   });
//   return [probMap, entropy];
// }

// function getPairsEntropy(fileContents, charProbs) {
//   fileContents = fileContents.replace("\n", "").toLowerCase();    // making code case insensitive and removing newline symbols
//   var pairCount = {};
//   const size = fileContents.length - 1;
//   for (var i = 0; i < size; i++) {                                // iterating over file contents by two symbols
//     var fChar = fileContents[i];
//     var sChar = fileContents[i+1];
//     if (!fChar.match(/[a-z0-9]/i) && fChar !== " ") fChar = ".";  // checking if any char of pair is a punctuation
//     if (!sChar.match(/[a-z0-9]/i) && sChar !== " ") sChar = ".";
//     var pair = fChar + sChar;
//     if (pairCount[pair] === undefined)                            // adding pair to map
//       pairCount[pair] = 1;
//     else
//       pairCount[pair] += 1;
//   }
//   var pairEntropy = 0;
//   Object.entries(pairCount).forEach(([pair, frequency]) => {
//     var pairProb = frequency / size;                                        // calculating probability for every pair
//     pairEntropy -= pairProb * charProbs[pair[1]][0] * Math.log2(pairProb);  // updating file entropy
//   });
//   return pairEntropy;
// }

export default App;