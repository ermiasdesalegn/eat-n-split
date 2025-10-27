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
      background: "#0a0e27",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: "relative"
    }}>
      <div style={{
        backgroundColor: "#1a1f3a",
        borderRadius: "32px",
        padding: "60px 50px",
        boxShadow: "0 0 100px rgba(64, 224, 208, 0.3)",
        border: "1px solid rgba(64, 224, 208, 0.2)",
        maxWidth: "600px",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #40e0d0 0%, #00c9ff 100%)",
          opacity: 0.1,
          filter: "blur(80px)"
        }}></div>
        
        <h1 style={{
          textAlign: "center",
          color: "#40e0d0",
          marginBottom: "8px",
          fontSize: "42px",
          fontWeight: "bold",
          fontFamily: "'Segoe UI', sans-serif",
          letterSpacing: "-1px"
        }}>
          Tip Calculator
        </h1>
        <p style={{
          textAlign: "center",
          color: "#8892b0",
          marginBottom: "40px",
          fontSize: "15px",
          fontWeight: "300"
        }}>
          Calculate your tip & split evenly
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
            marginTop: "45px",
            padding: "35px",
            background: "rgba(26, 31, 58, 0.5)",
            borderRadius: "20px",
            border: "1px solid rgba(64, 224, 208, 0.2)"
          }}>
            <h2 style={{
              color: "#40e0d0",
              marginBottom: "25px",
              fontSize: "22px",
              fontWeight: "600",
              textAlign: "center"
            }}>
              Breakdown
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
              marginBottom: "25px"
            }}>
              <div style={{
                padding: "20px",
                backgroundColor: "#0f1629",
                borderRadius: "16px",
                border: "1px solid rgba(64, 224, 208, 0.1)"
              }}>
                <div style={{ color: "#8892b0", fontSize: "13px", marginBottom: "8px", fontWeight: "400" }}>Bill</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#fff" }}>
                  ${bill}
                </div>
              </div>
              
              <div style={{
                padding: "20px",
                backgroundColor: "#0f1629",
                borderRadius: "16px",
                border: "1px solid rgba(64, 224, 208, 0.1)"
              }}>
                <div style={{ color: "#8892b0", fontSize: "13px", marginBottom: "8px", fontWeight: "400" }}>Tip</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#40e0d0" }}>
                  ${tip}
                </div>
              </div>
            </div>

            <div style={{
              padding: "28px",
              background: "linear-gradient(135deg, #40e0d0 0%, #00c9ff 100%)",
              borderRadius: "16px",
              marginBottom: "20px",
              textAlign: "center",
              color: "#0a0e27"
            }}>
              <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "10px", fontWeight: "600" }}>
                Total Amount
              </div>
              <div style={{ fontSize: "48px", fontWeight: "bold" }}>
                ${total}
              </div>
            </div>

            {avgPercent > 0 && (
              <div style={{
                padding: "20px",
                backgroundColor: "rgba(64, 224, 208, 0.1)",
                borderRadius: "16px",
                marginBottom: "20px",
                textAlign: "center",
                border: "1px solid rgba(64, 224, 208, 0.3)"
              }}>
                <div style={{ color: "#8892b0", fontSize: "13px", marginBottom: "8px", fontWeight: "400" }}>
                  Per Person (Split)
                </div>
                <div style={{ fontSize: "36px", fontWeight: "bold", color: "#40e0d0" }}>
                  ${perPerson.toFixed(2)}
                </div>
              </div>
            )}
            
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
    <div style={{ marginBottom: "30px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "12px", 
        fontWeight: "500",
        color: "#8892b0",
        fontSize: "15px"
      }}>
        How much was the bill?
      </label>
      <input 
        type="number" 
        value={bill} 
        onChange={(e) => handleBill(e)}
        placeholder="Enter amount..."
        style={{
          padding: "16px 20px",
          fontSize: "18px",
          borderRadius: "12px",
          border: "1px solid rgba(64, 224, 208, 0.2)",
          backgroundColor: "#0f1629",
          color: "#fff",
          width: "100%",
          transition: "all 0.3s",
          outline: "none"
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#40e0d0";
          e.target.style.boxShadow = "0 0 0 4px rgba(64, 224, 208, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(64, 224, 208, 0.2)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function PercentageSelect({ placeholder, handlePercent, percent }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "10px",
        fontWeight: "600",
        color: "#333",
        fontSize: "17px"
      }}>
        {placeholder}
      </label>
      <select
        onChange={handlePercent} 
        value={percent}
        style={{
          padding: "14px 16px",
          fontSize: "17px",
          borderRadius: "10px",
          border: "2px solid #e0e0e0",
          width: "100%",
          backgroundColor: "white",
          cursor: "pointer",
          transition: "all 0.3s",
          outline: "none"
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#ffa500";
          e.target.style.boxShadow = "0 0 0 3px rgba(255, 165, 0, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e0e0e0";
          e.target.style.boxShadow = "none";
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
        padding: "16px 32px",
        fontSize: "17px",
        background: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
        width: "100%",
        transition: "all 0.3s",
        boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-3px) scale(1.02)";
        e.target.style.boxShadow = "0 10px 30px rgba(255, 107, 107, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 6px 20px rgba(255, 107, 107, 0.3)";
      }}
    >
      🔄 Calculate Again
    </button>
  );
}

export default App;