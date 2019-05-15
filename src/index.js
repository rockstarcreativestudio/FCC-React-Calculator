import  React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'index.css';

class CalcButtons extends Component {
  constructor(props) {
    super(props)
  }
    
  render() {
    let { numbers, handleNum, handleClear, handleDec, handleEq, handleOp } = this.props;
    return (
      <div>
          <div className="row">
            <div className="col-9 numcol">
            <button id="clear" value="clear" onClick={handleClear} className="clearbtn"><h1 class="zerotitle">AC</h1></button>

                {numbers.map((num) => {
                 return( 
                   
                   <button onClick={handleNum} id={num.name} key={num.name} value={num.value} className="numbtn"><h1 class="numtitle">{num.value}</h1></button>
                )}
                             )}
                <button id="zero" value="0" onClick={handleNum} className="btnyuge"><h1 class="zerotitle">0</h1></button>
                <button id="decimal" value="." onClick={handleDec} className="numbtn"><h1 class="numtitle">.</h1></button>
            </div>
            <div className="col-3 funccol">
                  <button id="divide" value="/" onClick={handleOp} className="funcbtn"><h1>/</h1></button>
                  <button id="multiply" value="*" onClick={handleOp} className="funcbtn"><h1>*</h1></button>
                  <button id="subtract" value="-" onClick={handleOp}className="funcbtn"><h1>-</h1></button>
                  <button id="add" value="+" onClick={handleOp} className="funcbtn"><h1>+</h1></button>
                  <button id="equals" value="=" onClick={handleEq} className="funcbtn"><h1>=</h1></button>
            </div>
          </div>
      </div>
    )
  }
};

const Input = (props) => {
  return (
    <>
      <div className="displayinput">
       {props.children}
      </div>
    </>
  )
}

const Output = (props) => {
  return (
    <>
      <div id="display" className="displayoutput">
        {props.children}
      </div>
    </>
  )
}


const Display = (props) => {

  return (
      <>
          <div className="w-100"></div>
                <div className="col-12 displaycol">
                    <Input>{props.eq}</Input>
                    <Output>{props.currNum}</Output>
                </div>
      </>
  )
}


const CalcContainer = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
            <div className="calc-contain rounded py-4 calc shadow-lg">
            <Display currNum = {props.currNum} eq = {props.eq} />
            <CalcButtons numbers={props.numbers} handleDec={props.handleDec} handleEq={props.handleEq} handleNum={props.handleNum} handleClear={props.handleClear} handleOp={props.handleOp} />
            </div>
        </div>
      </div>
      </>
  )
}



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          currNum: '0',
          prevAns: '',
          eq: '',
          calcd: false,
          numbers: [
            {name: 'nine', value: 9},
            {name: 'eight', value: 8},
            {name: 'seven', value: 7},
            {name: 'six', value: 6},
            {name: 'five', value: 5},
            {name: 'four', value: 4},
            {name: 'three', value: 3},
            {name: 'two', value: 2},
            {name: 'one', value: 1}
            ]
        };
      }

          handleDec = () => {
            let op = /[/*-+]$/;
            if (this.state.calcd === true || this.state.currNum === '0') {
              this.setState({
                currNum: '0.',
                eq: this.state.prevAns + '0.',
                calcd: false
              })
            } else if (op.test(this.state.eq)) {
              this.setState({
                currNum: '0.',
                eq: this.state.eq + '0.'
              })
          } else {
            this.setState({
              currNum: this.state.currNum.includes('.') ? 
              this.state.currNum :
              this.state.currNum + '.',
              eq: this.state.currNum.includes('.') ?
              this.state.eq :
              this.state.eq + '.'
            }) 
          } 
        }

          handleNum = (e) => {
            if (this.state.currNum === '0' || this.state.calcd === true) {
              this.setState({
                currNum: e.currentTarget.value,
                eq: e.currentTarget.value
              })
            } else if (this.state.currNum.match(/[/*-+]/)) {
            this.setState({
              currNum: e.currentTarget.value,
              eq: this.state.eq + e.currentTarget.value
            })
           } else {
            this.setState({
              currNum: this.state.currNum + e.currentTarget.value,
              eq: this.state.eq + e.currentTarget.value
            })
          }
          }


        handleClear = (e) => {
          e.preventDefault();
          this.setState({
            currNum: '0',
          prevAns: '',
          eq: '',
          calcd: false
          })
        }


        handleOp = (e) => {
         if (this.state.eq.includes('=')) {
          this.setState({
            eq: this.state.prevAns + e.currentTarget.value,
            currNum: e.currentTarget.value,
            calcd: false
          })
        } else if (this.state.currNum.match(/[/*\-+]/) && this.state.eq.match(/[/*\-+]$/)) {
          this.setState({
            currNum: e.currentTarget.value,
            eq: this.state.eq.slice(0, -1) + e.currentTarget.value
          })
        
        } else {
          this.setState({
            currNum: e.currentTarget.value,
            prevAns: this.state.eq,
            eq: this.state.eq + e.currentTarget.value
          })
        }
        /* console.log(this.state.currNum) */
        }

        handleEq = (e) => {
          let op = /[/*-+]$/;
          if (this.state.calcd === false) {
            let answer = this.state.eq;
            if (op.test(answer)) {
              answer = answer.slice(0, -1);
            }
            answer = Math.round(10000000 * eval(answer)) / 10000000;
            this.setState({
              currNum: answer.toString(),
              prevAns: answer,
              eq: this.state.eq + '=' + answer,
              calcd: true
            })
          }
        }


        

  render() {
    return (
      <>
        <h1 className="text-center py-3 heading"> This is ma calculator.</h1>
        <CalcContainer 
      numbers={this.state.numbers} 
      handleNum = {this.handleNum} 
      eq = {this.state.eq} 
      currNum = {this.state.currNum} 
      handleClear={this.handleClear} 
      handleOp = {this.handleOp}
      handleDec = {this.handleDec} 
      handleEq = {this.handleEq} />
      </>
    )
  }
}


ReactDOM.render(
  <App />, 
  document.getElementById('root'));