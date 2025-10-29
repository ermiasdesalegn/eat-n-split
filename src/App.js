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
      backgroundColor: "#fafafa",
      padding: "20px",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "300",
          marginBottom: "48px",
          color: "#333",
          textAlign: "center"
        }}>
          Tip Calculator
        </h1>

        <div style={{ marginBottom: "32px" }}>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="Bill amount"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              border: "none",
              borderBottom: "1px solid #ddd",
              backgroundColor: "transparent",
              outline: "none",
              color: "#333"
            }}
          />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            color: "#666",
            marginBottom: "8px"
          }}>
            Tip
          </label>
          <input
            type="number"
            value={tip}
            onChange={(e) => setTip(Number(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              border: "none",
              borderBottom: "1px solid #ddd",
              backgroundColor: "transparent",
              outline: "none",
              color: "#333"
            }}
          />
        </div>

        <div style={{ marginBottom: "48px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            color: "#666",
            marginBottom: "8px"
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
              padding: "16px",
              fontSize: "18px",
              border: "none",
              borderBottom: "1px solid #ddd",
              backgroundColor: "transparent",
              outline: "none",
              color: "#333"
            }}
          />
        </div>

        {bill > 0 && (
          <div style={{
            paddingTop: "32px",
            borderTop: "1px solid #eee"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              fontSize: "16px",
              color: "#666"
            }}>
              <span>Tip</span>
              <span style={{ color: "#333" }}>${tipAmount.toFixed(2)}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
              fontSize: "20px",
              fontWeight: "500",
              color: "#333"
            }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {people > 1 && (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                color: "#666",
                paddingTop: "16px",
                borderTop: "1px solid #eee"
              }}>
                <span>Per person</span>
                <span style={{ color: "#333" }}>${perPerson.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
