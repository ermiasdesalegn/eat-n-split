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

  const avgPercent = (percent + percentFriend) / 2;
  const tip = bill ? Math.round((0.01 * bill * percent + 0.01 * bill * percentFriend) / 2) : 0;
  const total = bill ? bill + tip : 0;
  const perPerson = bill > 0 && avgPercent > 0 ? total / 2 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 50%, #feca57 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "50px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        maxWidth: "550px",
        width: "100%",
        animation: "fadeIn 0.5s ease-in"
      }}>
        <h1 style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "10px",
          fontSize: "40px",
          fontWeight: "bold",
          fontFamily: "'Segoe UI', sans-serif"
        }}>
          💰 Splitting the Bill
        </h1>
        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "35px",
          fontSize: "14px"
        }}>
          Calculate tips & split costs fairly
        </p>
        
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
          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            border: "2px solid #e9ecef"
          }}>
            <h2 style={{
              color: "#667eea",
              marginBottom: "15px",
              fontSize: "24px",
              textAlign: "center"
            }}>
              Total Amount
            </h2>
            <div style={{
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "10px",
              color: "#333"
            }}>
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold" }}>Bill:</span> ${bill}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold" }}>Tip:</span> ${tip}
              </div>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#667eea",
                marginTop: "10px"
              }}>
                Total: ${total}
              </div>
            </div>
            <Reset
              setPercent={setPercent}
              setBill={setBill}
              setPercentFriend={setPercentFriend}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function BillInput({ bill, handleBill }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "8px", 
        fontWeight: "600",
        color: "#333",
        fontSize: "16px"
      }}>
        💲 How much was the bill?
      </label>
      <input 
        type="number" 
        value={bill} 
        onChange={(e) => handleBill(e)}
        placeholder="Enter bill amount"
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "2px solid #e0e0e0",
          width: "100%",
          transition: "border 0.3s",
          outline: "none"
        }}
        onFocus={(e) => e.target.style.borderColor = "#667eea"}
        onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
      />
    </div>
  );
}

function PercentageSelect({ placeholder, handlePercent, percent }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "8px",
        fontWeight: "600",
        color: "#333",
        fontSize: "16px"
      }}>
        {placeholder}
      </label>
      <select
        onChange={handlePercent} 
        value={percent}
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "2px solid #e0e0e0",
          width: "100%",
          backgroundColor: "white",
          cursor: "pointer",
          transition: "border 0.3s",
          outline: "none"
        }}
        onFocus={(e) => e.target.style.borderColor = "#667eea"}
        onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
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
        padding: "14px 28px",
        fontSize: "16px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        width: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      }}
    >
      🔄 Reset
    </button>
  );
}

export default App;