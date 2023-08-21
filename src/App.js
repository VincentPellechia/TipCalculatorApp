import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [tip, setTip] = useState(0);
  const [tipPercentage, setTipPercentage] = useState();
  const [total, setTotal] = useState(0);
  const [bill, setBill] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (event) => {
    setBill(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if(bill&&tipPercentage&&numberOfPeople){
    // Calculate tip amount based on tip percentage and bill
    const tipAmount = (parseFloat(bill) * parseFloat(tipPercentage)) / 100;

    // Calculate total amount including tip
    const totalAmount = parseInt(bill) + parseInt(tipAmount);

    // Update the state with the calculated values
    setTip(tipAmount/numberOfPeople);

    setTotal(totalAmount/numberOfPeople);
    }
  }, [tipPercentage, bill, numberOfPeople]);

  const resetAmounts = () => {
    setBill();
    setNumberOfPeople();
    setTip(0);
    setTotal(0);
  };

  return (
    <div className="App">
      <div >
        <h2 className="logo">SPLITTER</h2>
        <div className="container">
          
          <div className="left-div">
          <label>Bill</label>
            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
              <input 
              type="text" 
              value={bill} 
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="0"
              ></input>
            </div>
            <label>Select Tip %</label>
            <div className="tip-percentage">
              <button onClick={() => setTipPercentage(5)} className={tipPercentage === 5 ? 'selected' : ''}>5%</button>
              <button onClick={() => setTipPercentage(10)} className={tipPercentage === 10 ? 'selected' : ''}>10%</button>
              <button onClick={() => setTipPercentage(15)} className={tipPercentage === 15 ? 'selected' : ''}>15%</button>
              <button onClick={() => setTipPercentage(25)} className={tipPercentage === 25 ? 'selected' : ''}>25%</button>
              <button onClick={() => setTipPercentage(50)} className={tipPercentage === 50 ? 'selected' : ''}>50%</button>
              <input onChange={(e) => setTipPercentage(e.target.value)} value={tipPercentage} className={tipPercentage === {tipPercentage} ? 'selected' : ''} placeholder="CUSTOM"></input>
             </div>
             <div className="number-of-people-labels">
             <label>Number of People</label>
             {numberOfPeople < 1 && <label className="required">Can't be Zero</label>}
             </div>
             <div className={`number-of-people ${numberOfPeople > 0 ? '' : 'invalid'}`}>
              <input onChange={(e) => setNumberOfPeople(e.target.value)} value={numberOfPeople} placeholder="1"></input>
            </div>
          </div>
          <div className="right-div">
            <div className="tip-amount">Tip Amount ${tip}</div>
            <div className="total-amount">Total Amount ${total}</div>
            <button onClick={resetAmounts}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
