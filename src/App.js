import React, {useState, useEffect} from "react";
import './App.css';
import logo from './logo.svg';
import dollar from './icon-dollar.svg';
import person from './icon-person.svg';

function App() {

  const [tip, setTip] = useState("0.00");
  const [tipPercentage, setTipPercentage] = useState();
  const [total, setTotal] = useState("0.00");
  const [bill, setBill] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [isNumberOfPeopleFocused, setIsNumberOfPeopleFocused] = useState(false);
  const [isCustomTipFocused, setIsCustomTipFocused] = useState(false);
  
  const handleChange = (event) => {
    setBill(event.target.value);
  };

  const handleFocus = (inputType) => {
    if (inputType === "bill") {
      setIsFocused(true);
    } else if (inputType === "numberOfPeople") {
      setIsNumberOfPeopleFocused(true);
    } else if (inputType === "customTip") {
      setIsCustomTipFocused(true);
    }

  };
  
  const handleBlur = (inputType) => {
    if (inputType === "bill") {
      setIsFocused(false);
    } else if (inputType === "numberOfPeople") {
      setIsNumberOfPeopleFocused(false);
    } else if (inputType === "customTip") {
      setIsCustomTipFocused(false);
    }
  };

  useEffect(() => {
    if(bill&&tipPercentage&&numberOfPeople){
    // Calculate tip amount based on tip percentage and bill
    const tipAmount = (parseFloat(bill) * parseFloat(tipPercentage)) / 100;

    // Calculate total amount including tip
    const totalAmount = parseFloat(bill) + parseFloat(tipAmount);

    // Update the state with the calculated values
    setTip((tipAmount/numberOfPeople).toFixed(2));

    setTotal((totalAmount/numberOfPeople).toFixed(2));
    }
  }, [tipPercentage, bill, numberOfPeople]);

  const resetAmounts = () => {
    setBill("");
    setTipPercentage("");
    setNumberOfPeople(1);
    setTip((0).toFixed(2));
    setTotal((0).toFixed(2));
  };

  return (
    <div className="App">
      <div >
      <img src={logo} alt="Logo" className="logo-icon" />
        <div className="container">
          
          <div className="left-div">
          <label>Bill</label>
            <div className={`input-container ${isFocused ? 'focused' : ''}`}>
            <img src={dollar} alt="dollar" className="icon" />
              <input 
              type="text" 
              value={bill} 
              onChange={handleChange}
              onFocus={() => handleFocus("bill")}
              onBlur={() => handleBlur("bill")}
              placeholder="0.00"
              ></input>
            </div>
            <label>Select Tip %</label>
            <div className="tip-percentage">
              <button onClick={() => setTipPercentage(5)} className={tipPercentage === 5 ? 'selected' : ''}>5%</button>
              <button onClick={() => setTipPercentage(10)} className={tipPercentage === 10 ? 'selected' : ''}>10%</button>
              <button onClick={() => setTipPercentage(15)} className={tipPercentage === 15 ? 'selected' : ''}>15%</button>
              <button onClick={() => setTipPercentage(25)} className={tipPercentage === 25 ? 'selected' : ''}>25%</button>
              <button onClick={() => setTipPercentage(50)} className={tipPercentage === 50 ? 'selected' : ''}>50%</button>
              <input 
              onChange={(e) => setTipPercentage(e.target.value)} value={tipPercentage} 
              className={`custom-tip ${isCustomTipFocused ? 'focused' : ''}`}
              onFocus={() => handleFocus("customTip")}
              onBlur={() => handleBlur("customTip")}
              placeholder="CUSTOM"></input>
             </div>
            <div className="number-of-people-container">
              <div className="number-of-people-labels">
                <label>Number of People</label>
                {numberOfPeople < 1 && <label className="required">Can't be Zero</label>}
              </div>
              <div className={`number-of-people ${numberOfPeople > 0 ? '' : 'invalid'} ${isNumberOfPeopleFocused ? 'focused' : ''}`}>
              <img src={person} alt="person" className="icon" />
                <input
                onChange={(e) => setNumberOfPeople(e.target.value)}
                onFocus={() => handleFocus("numberOfPeople")}
                onBlur={() => handleBlur("numberOfPeople")}
                value={numberOfPeople}
                placeholder="1"
                />
              </div>
            </div>
          </div>
          <div className="right-div">
            <div className="row">
              <div>
                <div>
                  Tip Amount
                </div>
                <div style={{ color: '#649397', fontSize:'12px' }}>
                  / person
                </div>
              </div>
              <aside>
                ${tip}
              </aside>
            </div>
            <div className="row">
            <div>
                <div>
                  Total Amount
                </div>
                <div style={{ color: '#649397', fontSize:'12px' }}>
                  / person
                </div>
              </div>
              <aside>
                ${total}
              </aside>
            </div>
            <button className="reset" onClick={resetAmounts}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
