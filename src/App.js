// import "./App.css";

import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);

  const [percent, setPercent] = useState(0);
  const [percentFriend, setPercentFriend] = useState(0);

  function handlePercent(e) {
    setPercent(e.target.value);
  }
  function handlePercentFriend(e) {
    setPercentFriend(e.target.value);
  }

  function handleBill(e) {
    setBill(e.target.value);
  }

  const tip = (0.01 * bill * percent + 0.01 * bill * percentFriend) / 2;
  return (
    <div>
      <Bill bill={bill} handleBill={handleBill} />
      <Percentage
        placeholder="How did you like the service "
        percent={percent}
        handlePercent={handlePercent}
      />
      <Percentage
        placeholder="How did your friend like the service "
        handlePercent={handlePercentFriend}
        percent={percentFriend}
      />
      <h2>
        You pay ${bill} (${bill + tip} + ${tip} tip)
      </h2>
    </div>
  );
}
function Bill({ bill, handleBill }) {
  return (
    <div>
      <p></p>
      {"How much was the bill? "}
      <input type="number" value={bill} onChange={handleBill} />
    </div>
  );
}
function Percentage({ placeholder, percent, handlePercent }) {
  return (
    <div>
      {placeholder}
      <select onChange={handlePercent}>
        <option value={0}>Dissatisfied(0%)</option>
        <option value={5}>it was okay (5%)</option>
        <option value={10}>it was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

export default App;
