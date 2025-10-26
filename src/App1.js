import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [percent, setPercent] = useState(0);
  const [percentFriend, setPercentFriend] = useState(0);

  function handlePercent(e) {
    setPercent(Number(e.target.value));
  }

  function handlePercentFriend(e) {
    setPercentFriend(Number(e.target.value));
  }

  function handleBill(e) {
    setBill(e.target.value ? Number(e.target.value) : "");
  }

  const tip = bill ? Math.round((0.01 * bill * percent + 0.01 * bill * percentFriend) / 2) : 0;
  const total = bill ? bill + tip : 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <BillInput bill={bill} handleBill={handleBill} />
      <PercentageSelect
        placeholder="How did you like the service? "
        percent={percent}
        handlePercent={handlePercent}
      />
      <PercentageSelect
        placeholder="How did your friend like the service? "
        handlePercent={handlePercentFriend}
        percent={percentFriend}
      />
      
      {bill > 0 && (
        <>
          <h2>
            You pay ${total} (${bill} bill + ${tip} tip)
          </h2>
          <Reset
            setPercent={setPercent}
            setBill={setBill}
            setPercentFriend={setPercentFriend}
          />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, handleBill }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
        How much was the bill? {" "}
      </label>
      <input 
        type="number" 
        value={bill} 
        onChange={(e) => handleBill(e)} 
        style={{
          padding: "8px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "200px"
        }}
      />
    </div>
  );
}

function PercentageSelect({ placeholder, handlePercent, percent }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {placeholder}
      </label>
      <select 
        onChange={handlePercent} 
        value={percent}
        style={{
          padding: "8px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "250px"
        }}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Reset({ setBill, setPercent, setPercentFriend }) {
  return (
    <button
      onClick={() => {
        setBill("");
        setPercent(0);
        setPercentFriend(0);
      }}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Reset
    </button>
  );
}

export default App;
