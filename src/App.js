import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);

  const tipAmount = bill ? (bill * tip / 100) : 0;
  const total = bill ? parseFloat(bill) + tipAmount : 0;
  const perPerson = people > 0 ? total / people : 0;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "400",
          marginBottom: "40px",
          color: "#1a1a1a",
          textAlign: "center",
          letterSpacing: "-0.5px"
        }}>
          Tip Calculator
        </h1>

        <div style={{ marginBottom: "28px" }}>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="Bill amount"
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: "16px",
              border: "none",
              borderBottom: "2px solid #e0e0e0",
              backgroundColor: "transparent",
              outline: "none",
              color: "#1a1a1a",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => {
              e.target.style.borderBottomColor = "#4a90e2";
            }}
            onBlur={(e) => {
              e.target.style.borderBottomColor = "#e0e0e0";
            }}
          />
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#666",
            marginBottom: "10px",
            fontWeight: "500"
          }}>
            Tip
          </label>
          <input
            type="number"
            value={tip}
            onChange={(e) => setTip(Number(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: "16px",
              border: "none",
              borderBottom: "2px solid #e0e0e0",
              backgroundColor: "transparent",
              outline: "none",
              color: "#1a1a1a",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => {
              e.target.style.borderBottomColor = "#4a90e2";
            }}
            onBlur={(e) => {
              e.target.style.borderBottomColor = "#e0e0e0";
            }}
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#666",
            marginBottom: "10px",
            fontWeight: "500"
          }}>
            People
          </label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
            min="1"
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: "16px",
              border: "none",
              borderBottom: "2px solid #e0e0e0",
              backgroundColor: "transparent",
              outline: "none",
              color: "#1a1a1a",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => {
              e.target.style.borderBottomColor = "#4a90e2";
            }}
            onBlur={(e) => {
              e.target.style.borderBottomColor = "#e0e0e0";
            }}
          />
        </div>

        {bill > 0 && (
          <div style={{
            paddingTop: "32px",
            borderTop: "2px solid #f0f0f0",
            marginTop: "8px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              fontSize: "15px",
              color: "#666"
            }}>
              <span>Tip</span>
              <span style={{ 
                color: "#1a1a1a",
                fontWeight: "500"
              }}>${tipAmount.toFixed(2)}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: people > 1 ? "24px" : "0",
              fontSize: "22px",
              fontWeight: "600",
              color: "#1a1a1a",
              paddingTop: "20px",
              borderTop: "2px solid #f0f0f0"
            }}>
              <span>Total</span>
              <span style={{ 
                color: "#4a90e2",
                fontSize: "24px"
              }}>${total.toFixed(2)}</span>
            </div>
            {people > 1 && (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "15px",
                color: "#666",
                paddingTop: "20px",
                borderTop: "2px solid #f0f0f0",
                marginTop: "20px"
              }}>
                <span>Per person</span>
                <span style={{ 
                  color: "#1a1a1a",
                  fontWeight: "500"
                }}>${perPerson.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
