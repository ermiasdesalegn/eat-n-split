import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);

  const tipAmount = bill ? (bill * tip / 100) : 0;
  const total = bill ? parseFloat(bill) + tipAmount : 0;
  const perPerson = people > 0 ? total / people : 0;

  const quickTips = [10, 15, 18, 20, 25];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      padding: "40px 20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        backgroundColor: "#fff",
        borderRadius: "24px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0"
      }}>
        {/* Left Panel - Inputs */}
        <div style={{
          padding: "50px",
          backgroundColor: "#fff"
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#1a1a1a",
            letterSpacing: "-0.5px"
          }}>
            Tip Calculator
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "40px"
          }}>
            Enter your bill details below
          </p>

          <div style={{ marginBottom: "32px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              color: "#333",
              marginBottom: "12px",
              fontWeight: "500"
            }}>
              Bill Amount
            </label>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{
                position: "absolute",
                left: "16px",
                fontSize: "18px",
                color: "#666"
              }}>$</span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0.00"
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 32px",
                  fontSize: "18px",
                  border: "2px solid #e1e5e9",
                  borderRadius: "12px",
                  backgroundColor: "#fafbfc",
                  outline: "none",
                  color: "#1a1a1a",
                  transition: "all 0.2s",
                  fontWeight: "500"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4a90e2";
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.boxShadow = "0 0 0 4px rgba(74, 144, 226, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e1e5e9";
                  e.target.style.backgroundColor = "#fafbfc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              color: "#333",
              marginBottom: "12px",
              fontWeight: "500"
            }}>
              Select Tip %
            </label>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              marginBottom: "12px"
            }}>
              {quickTips.map(tipPercent => (
                <button
                  key={tipPercent}
                  onClick={() => setTip(tipPercent)}
                  style={{
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: "600",
                    border: tip === tipPercent ? "2px solid #4a90e2" : "2px solid #e1e5e9",
                    borderRadius: "10px",
                    backgroundColor: tip === tipPercent ? "#e8f2ff" : "#fafbfc",
                    color: tip === tipPercent ? "#4a90e2" : "#333",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (tip !== tipPercent) {
                      e.target.style.borderColor = "#4a90e2";
                      e.target.style.backgroundColor = "#f0f7ff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tip !== tipPercent) {
                      e.target.style.borderColor = "#e1e5e9";
                      e.target.style.backgroundColor = "#fafbfc";
                    }
                  }}
                >
                  {tipPercent}%
                </button>
              ))}
            </div>
            <input
              type="number"
              value={tip}
              onChange={(e) => setTip(Number(e.target.value) || 0)}
              placeholder="Custom"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "16px",
                border: "2px solid #e1e5e9",
                borderRadius: "10px",
                backgroundColor: "#fafbfc",
                outline: "none",
                color: "#1a1a1a",
                transition: "all 0.2s",
                textAlign: "center",
                fontWeight: "500"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4a90e2";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 4px rgba(74, 144, 226, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.backgroundColor = "#fafbfc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "0" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              color: "#333",
              marginBottom: "12px",
              fontWeight: "500"
            }}>
              Number of People
            </label>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{
                position: "absolute",
                left: "16px",
                fontSize: "18px",
                color: "#666"
              }}>👥</span>
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
                min="1"
                placeholder="1"
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 44px",
                  fontSize: "18px",
                  border: "2px solid #e1e5e9",
                  borderRadius: "12px",
                  backgroundColor: "#fafbfc",
                  outline: "none",
                  color: "#1a1a1a",
                  transition: "all 0.2s",
                  fontWeight: "500"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4a90e2";
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.boxShadow = "0 0 0 4px rgba(74, 144, 226, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e1e5e9";
                  e.target.style.backgroundColor = "#fafbfc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div style={{
          padding: "50px",
          backgroundColor: "#1a1f2e",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "40px",
              color: "#fff"
            }}>
              Summary
            </h2>

            {bill > 0 ? (
              <>
                <div style={{
                  marginBottom: "32px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        marginBottom: "4px"
                      }}>
                        Bill
                      </div>
                      <div style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#fff"
                      }}>
                        ${parseFloat(bill).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        marginBottom: "4px"
                      }}>
                        Tip ({tip}%)
                      </div>
                      <div style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#4a90e2"
                      }}>
                        ${tipAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        marginBottom: "4px"
                      }}>
                        Total
                      </div>
                      <div style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#fff"
                      }}>
                        ${total.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {people > 1 && (
                    <div style={{
                      marginTop: "32px",
                      paddingTop: "24px",
                      borderTop: "2px solid rgba(255,255,255,0.2)"
                    }}>
                      <div style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        marginBottom: "8px"
                      }}>
                        Per Person ({people} {people === 1 ? 'person' : 'people'})
                      </div>
                      <div style={{
                        fontSize: "28px",
                        fontWeight: "600",
                        color: "#4a90e2"
                      }}>
                        ${perPerson.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{
                padding: "60px 20px",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                  opacity: 0.3
                }}>💡</div>
                <div style={{
                  fontSize: "16px",
                  color: "#94a3b8"
                }}>
                  Enter your bill amount to see the breakdown
                </div>
              </div>
            )}
          </div>

          {bill > 0 && (
            <button
              onClick={() => {
                setBill("");
                setTip(15);
                setPeople(1);
              }}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                marginTop: "auto"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#357abd";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(74, 144, 226, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#4a90e2";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
