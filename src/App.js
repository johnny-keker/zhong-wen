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
            let selected = (app.state.vowelButton === this) ? "" : size;
            app.setState({"vowel" : selected})
            app.state.vowelButton = (app.state.vowelButton === this) ? null : this;
            app.selectVowel(selected);
          }
          else if (type == 1)
          {
            if (app.state.consonantButton != null) app.state.consonantButton.setSelected();
            let selected = (app.state.consonantButton === this) ? "" : size;
            app.setState({"consonant" : selected})
            app.state.consonantButton = (app.state.consonantButton === this) ? null : this;
          }
          else
          {
            if (app.state.toneButton != null) app.state.toneButton.setSelected();
            app.setState({"tone" : size})
            app.state.toneButton = this;
          }
          this.setSelected();
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
      toneButton: null,
      hieroglyph: "",
      pinin: "",
      meaning: ""
    };
  }

  selectVowel(vowel) {
    let consButtons = Array.from(document.getElementsByClassName('sizeButton 1'));
    let toneButtons = Array.from(document.getElementsByClassName('sizeButton 2'));
    let possible = this.state.info["data"].filter((obj) => {return obj.vowel === vowel});
    consButtons.forEach(button => {
      // disable consonants, that cannot be used with selected vowel
      button.disabled = vowel != "" && possible.filter((y) => {return y.consonant === button.textContent}).length === 0;
    });
    toneButtons.forEach(button => {
      // disable tones, that cannot be used with selected vowel
      button.disabled = vowel != "" && possible.filter((y) => {return y.tone == button.textContent && y.consonant === this.state.consonant}).length === 0;
    });
    console.log(this.state.tone);
    console.log(this.state.consonant);
    console.log(vowel);
    let word = this.state.info["data"].find(obj => {return obj.tone == this.state.tone && obj.consonant === this.state.consonant && obj.vowel == vowel});
    if (word != undefined)
    {
      this.state.hieroglyph = word.sym;
      this.state.pinin = word.pinin;
      this.state.meaning = word.translation;
    }
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
      <h3>{this.state.hieroglyph}</h3>
      <h3>{this.state.pinin}</h3>
      <h3>{this.state.meaning}</h3>
    </div>
    );
  }
}
export default App;