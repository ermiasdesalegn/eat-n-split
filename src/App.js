// import "./App.css";

import { useState } from "react";

function App() {
  return (
    <div>
      <Bill />
      <Percentage />
    </div>
  );
}
function Bill() {
  const [bill, setBill] = useState(0);
  return (
    <div>
      <p></p>
      {"How much was the bill? "}
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
    </div>
  );
}
function Percentage({ placeholder }) {
  const [percent, setPercent] = useState(0);
  return (
    <div>
      {placeholder}
      <select>
        <option value={0}>Dissatisfied(0%)</option>
        <option value={5}>it was okay (5%)</option>
        <option value={10}>it was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

export default App;
