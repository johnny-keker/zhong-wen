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
            app.selectConsonant(selected);
          }
          else if (type == 2)
          {
            if (app.state.toneButton != null
                && app.state.toneButton.state.isSelected) app.state.toneButton.setSelected();
            let selected = (app.state.toneButton === this) ? 0 : size;
            app.setState({"tone" : selected})
            app.state.toneButton = (app.state.toneButton === this) ? null : this;
            app.selectTone(selected);
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

    this.updateWord(vowel, this.state.consonant, this.state.tone);
  }

  selectConsonant(consonant) {
    let vowlButtons = Array.from(document.getElementsByClassName('sizeButton 0'));
    let toneButtons = Array.from(document.getElementsByClassName('sizeButton 2'));
    let possible = this.state.info["data"].filter((obj) => {return obj.consonant === consonant});
    vowlButtons.forEach(button => {
      // disable consonants, that cannot be used with selected vowel
      button.disabled = consonant != "" && possible.filter((y) => {return y.vowel === button.textContent}).length === 0;
    });
    toneButtons.forEach(button => {
      // disable tones, that cannot be used with selected vowel
      button.disabled = consonant != "" && possible.filter((y) => {return y.tone == button.textContent && y.vowel === this.state.vowel}).length === 0;
    });

    this.updateWord(this.state.vowel, consonant, this.state.tone);
  }

  selectTone(tone) {
    let vowlButtons = Array.from(document.getElementsByClassName('sizeButton 0'));
    let consButtons = Array.from(document.getElementsByClassName('sizeButton 1'));
    let possible = this.state.info["data"].filter((obj) => {return obj.tone === tone});
    // vowlButtons.forEach(button => {
    //   // disable consonants, that cannot be used with selected vowel
    //   button.disabled = tone != 0 && possible.filter((y) => {return y.vowel == button.textContent}).length === 0;
    // });
    // consButtons.forEach(button => {
    //   // disable consonants, that cannot be used with selected vowel
    //   button.disabled = tone != 0 && possible.filter((y) => {return y.consonant == button.textContent}).length === 0;
    // });

    this.updateWord(this.state.vowel, this.state.consonant, tone);
  }

  updateWord(vowel, consonant, tone) {
    let word = this.state.info["data"].find(obj => {return obj.tone       == tone
                                                        && obj.consonant  == consonant
                                                        && obj.vowel      == vowel});
    if (word != undefined)
    {
      this.state.hieroglyph = word.sym;
      this.state.pinin = word.pinin;
      this.state.meaning = word.translation;
    }
    else
    {
      this.state.hieroglyph = "";
      this.state.pinin = "";
      this.state.meaning = "";
    }
    if (word === undefined && tone != 0) {
      this.state.tone = 0;
      this.state.toneButton.setSelected();
    }
  }
  
  render() {
    return (
      <div className="row">
      <div className='main-container column1'>
      <h3>Vowel</h3>
      <div>
        <SizeButton size="a" app={this} type={0} />
        <SizeButton size="ai" app={this} type={0} />
        <SizeButton size="ang" app={this} type={0} />
        <SizeButton size="ao" app={this} type={0} />
        <SizeButton size="e" app={this} type={0} />
        <SizeButton size="ei" app={this} type={0} />
        <SizeButton size="en" app={this} type={0} />
        <br/>
        <SizeButton size="eng" app={this} type={0} />
        <SizeButton size="er" app={this} type={0} />
        <SizeButton size="i" app={this} type={0} />
        <SizeButton size="ia" app={this} type={0} />
        <SizeButton size="ian" app={this} type={0} />
        <SizeButton size="iang" app={this} type={0} />
        <SizeButton size="iao" app={this} type={0} />
        <br/>
        <SizeButton size="ie" app={this} type={0} />
        <SizeButton size="in" app={this} type={0} />
        <SizeButton size="ing" app={this} type={0} />
        <SizeButton size="iong" app={this} type={0} />
        <SizeButton size="iou" app={this} type={0} />
        <SizeButton size="o" app={this} type={0} />
        <SizeButton size="ong" app={this} type={0} />
        <br/>
        <SizeButton size="ou" app={this} type={0} />
        <SizeButton size="u" app={this} type={0} />
        <SizeButton size="ua" app={this} type={0} />
        <SizeButton size="uai" app={this} type={0} />
        <SizeButton size="uan" app={this} type={0} />
        <SizeButton size="uang" app={this} type={0} />
        <SizeButton size="uei" app={this} type={0} />
        <br/>
        <SizeButton size="uen" app={this} type={0} />
        <SizeButton size="ueng" app={this} type={0} />
        <SizeButton size="uo" app={this} type={0} />
        <SizeButton size="ü" app={this} type={0} />
        <SizeButton size="üan" app={this} type={0} />
        <SizeButton size="üe" app={this} type={0} />
        <SizeButton size="ün" app={this} type={0} />
      </div>
      
      <h3>Consonant</h3>
      <div>
        <SizeButton size="b" app={this} type={1}/>
        <SizeButton size="p" app={this} type={1}/>
        <SizeButton size="m" app={this} type={1}/>
        <SizeButton size="f" app={this} type={1}/>
        <SizeButton size="d" app={this} type={1}/>
        <SizeButton size="t" app={this} type={1}/>
        <SizeButton size="n" app={this} type={1}/>
        <br/>
        <SizeButton size="l" app={this} type={1}/>
        <SizeButton size="g" app={this} type={1}/>
        <SizeButton size="k" app={this} type={1}/>
        <SizeButton size="h" app={this} type={1}/>
        <SizeButton size="j" app={this} type={1}/>
        <SizeButton size="q" app={this} type={1}/>
        <SizeButton size="x" app={this} type={1}/>
        <br/>
        <SizeButton size="z" app={this} type={1}/>
        <SizeButton size="s" app={this} type={1}/>
        <SizeButton size="c" app={this} type={1}/>
        <SizeButton size="zh" app={this} type={1}/>
        <SizeButton size="ch" app={this} type={1}/>
        <SizeButton size="sh" app={this} type={1}/>
        <SizeButton size="r" app={this} type={1}/>
      </div>
      <h3>Tone</h3>
      <div>
        <SizeButton size="1" app={this} type={2}/>
        <SizeButton size="2" app={this} type={2}/>
        <SizeButton size="3" app={this} type={2}/>
        <SizeButton size="4" app={this} type={2}/>
      </div>

      <button className="clearButton" onClick={() => {
        if (this.state.vowelButton != null && this.state.vowelButton.state.isSelected) this.state.vowelButton.setSelected();
        if (this.state.consonantButton != null && this.state.consonantButton.state.isSelected) this.state.consonantButton.setSelected();
        if (this.state.toneButton != null && this.state.toneButton.state.isSelected) this.state.toneButton.setSelected();
        this.selectVowel("");
        this.selectConsonant("");
        this.selectTone(0);
        this.setState({ "vowel": "",
                        "consonant": "",
                        "text": "",
                        "tone": 0,
                        "vowelButton": null,
                        "consonantButton": null,
                        "toneButton": null,
                        "hieroglyph": "",
                        "pinin": "",
                        "meaning": ""})
      }}>
        Clear All
      </button>
    </div>
    <div className='column2'>
      <center>
      <h3>{this.state.pinin}</h3>
      <div className='hieroglyph'>{this.state.hieroglyph}</div>
      <h3>{this.state.meaning}</h3>
      </center>
      </div>
      
    <div className='column3'></div>
    </div>

    );
  }
}
export default App;