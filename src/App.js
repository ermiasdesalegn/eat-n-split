import { useEffect, useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(15);
  const [tax, setTax] = useState(0);
  const [people, setPeople] = useState(1);
  const [rounding, setRounding] = useState("none"); // "none", "up", "down"
  const [copied, setCopied] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const savedTip = localStorage.getItem('tipPercentage');
    if (savedTip) setTip(Number(savedTip));
    const savedTax = localStorage.getItem('taxPercentage');
    if (savedTax) setTax(Number(savedTax));
  }, []);

  // Save preferences
  useEffect(() => {
    if (tip > 0) {
      localStorage.setItem('tipPercentage', tip.toString());
    }
  }, [tip]);

  useEffect(() => {
    if (tax >= 0) {
      localStorage.setItem('taxPercentage', tax.toString());
    }
  }, [tax]);

  function roundAmount(amount, method) {
    if (method === "up") {
      return Math.ceil(amount);
    } else if (method === "down") {
      return Math.floor(amount);
    }
    return amount;
  }

  const billAmount = bill ? parseFloat(bill) : 0;
  const taxAmount = billAmount * (tax / 100);
  const subtotal = billAmount + taxAmount;
  let tipAmount = subtotal * (tip / 100);
  let total = subtotal + tipAmount;
  
  // Apply rounding if selected
  let adjustedTipAmount = tipAmount;
  if (rounding !== "none" && billAmount > 0) {
    total = roundAmount(total, rounding);
    // Adjust tip amount to match rounded total
    adjustedTipAmount = total - subtotal;
    if (adjustedTipAmount < 0) adjustedTipAmount = 0;
  }
  
  const perPerson = people > 0 ? total / people : 0;

  const quickTips = [10, 15, 18, 20, 25];

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function copyToClipboard() {
    let text = `Tip Calculator Summary\n\n`;
    text += `Bill: ${formatCurrency(billAmount)}\n`;
    if (tax > 0) {
      text += `Tax (${tax}%): ${formatCurrency(taxAmount)}\n`;
      text += `Subtotal: ${formatCurrency(subtotal)}\n`;
    }
    text += `Tip (${tip}%): ${formatCurrency(rounding !== "none" ? adjustedTipAmount : tipAmount)}\n`;
    if (rounding !== "none") {
      text += `Rounding: ${rounding === "up" ? "Round Up" : "Round Down"}\n`;
    }
    text += `Total: ${formatCurrency(total)}`;
    if (people > 1) {
      text += `\nPer Person (${people} people): ${formatCurrency(perPerson)}`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function incrementPeople() {
    setPeople(prev => Math.min(20, prev + 1));
  }

  function decrementPeople() {
    setPeople(prev => Math.max(1, prev - 1));
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
      padding: "60px 20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #e5e5e5",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0"
      }}>
        {/* Left Panel - Inputs */}
        <div style={{
          padding: "60px 50px",
          backgroundColor: "#fff"
        }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "400",
            marginBottom: "8px",
            color: "#000",
            letterSpacing: "-0.5px"
          }}>
            Tip Calculator
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#999",
            marginBottom: "48px",
            fontWeight: "300"
          }}>
            Calculate tip and split the bill
          </p>

          <div style={{ marginBottom: "40px" }}>
            <label style={{
              display: "block",
              fontSize: "13px",
              color: "#666",
              marginBottom: "8px",
              fontWeight: "400",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
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
                left: "12px",
                fontSize: "16px",
                color: "#999"
              }}>$</span>
              <input
                type="number"
                value={bill}
                onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (!isNaN(value) && value >= 0)) {
                  setBill(value);
                }
              }}
                placeholder="0.00"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 28px",
                  fontSize: "16px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  outline: "none",
                  color: "#000",
                  transition: "border-color 0.2s",
                  fontWeight: "400"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#000";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e5e5";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <label style={{
              display: "block",
              fontSize: "13px",
              color: "#666",
              marginBottom: "8px",
              fontWeight: "400",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Tip %
            </label>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "8px",
              marginBottom: "8px"
            }}>
              {quickTips.map(tipPercent => (
                <button
                  key={tipPercent}
                  onClick={() => setTip(tipPercent)}
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "400",
                    border: tip === tipPercent ? "1px solid #000" : "1px solid #e5e5e5",
                    borderRadius: "4px",
                    backgroundColor: tip === tipPercent ? "#000" : "#fff",
                    color: tip === tipPercent ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                  onMouseEnter={(e) => {
                    if (tip !== tipPercent) {
                      e.target.style.borderColor = "#999";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tip !== tipPercent) {
                      e.target.style.borderColor = "#e5e5e5";
                    }
                  }}
                >
                  {tipPercent}%
                </button>
              ))}
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              <input
                type="number"
                value={tip}
                onChange={(e) => setTip(Number(e.target.value) || 0)}
                placeholder="Custom"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 14px",
                  fontSize: "14px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  outline: "none",
                  color: "#000",
                  transition: "border-color 0.2s",
                  fontWeight: "400"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#000";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e5e5";
                }}
              />
              <span style={{
                position: "absolute",
                right: "12px",
                fontSize: "14px",
                color: "#999",
                fontWeight: "400"
              }}>%</span>
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
              Tax % (Optional)
            </label>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              <input
                type="number"
                value={tax || ""}
                onChange={(e) => setTax(Math.max(0, Number(e.target.value) || 0))}
                placeholder="0"
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 16px",
                  fontSize: "16px",
                  border: "2px solid #e1e5e9",
                  borderRadius: "10px",
                  backgroundColor: "#fafbfc",
                  outline: "none",
                  color: "#1a1a1a",
                  transition: "all 0.2s",
                  fontWeight: "500"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e1e5e9";
                  e.target.style.backgroundColor = "#fafbfc";
                  e.target.style.boxShadow = "none";
                }}
              />
              <span style={{
                position: "absolute",
                right: "16px",
                fontSize: "16px",
                color: "#666",
                fontWeight: "500"
              }}>%</span>
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
              Rounding
            </label>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px"
            }}>
              {[
                { value: "none", label: "None" },
                { value: "up", label: "Round Up" },
                { value: "down", label: "Round Down" }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setRounding(option.value)}
                  style={{
                    padding: "12px 8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: rounding === option.value ? "2px solid #667eea" : "2px solid #e1e5e9",
                    borderRadius: "12px",
                    backgroundColor: rounding === option.value ? "#f0edff" : "#fafbfc",
                    color: rounding === option.value ? "#667eea" : "#333",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (rounding !== option.value) {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.backgroundColor = "#f8f6ff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (rounding !== option.value) {
                      e.target.style.borderColor = "#e1e5e9";
                      e.target.style.backgroundColor = "#fafbfc";
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
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
              display: "flex",
              gap: "12px",
              alignItems: "center"
            }}>
              <button
                onClick={decrementPeople}
                disabled={people <= 1}
                style={{
                  width: "48px",
                  height: "48px",
                  fontSize: "24px",
                  fontWeight: "600",
                  border: "2px solid #e1e5e9",
                  borderRadius: "12px",
                  backgroundColor: people <= 1 ? "#f5f5f5" : "#fafbfc",
                  color: people <= 1 ? "#ccc" : "#333",
                  cursor: people <= 1 ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (people > 1) {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.backgroundColor = "#f0edff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (people > 1) {
                    e.target.style.borderColor = "#e1e5e9";
                    e.target.style.backgroundColor = "#fafbfc";
                  }
                }}
              >
                −
              </button>
              <div style={{
                position: "relative",
                flex: 1
              }}>
                <span style={{
                  position: "absolute",
                  left: "16px",
                  fontSize: "18px",
                  color: "#666",
                  top: "50%",
                  transform: "translateY(-50%)"
                }}>👥</span>
                <input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                  min="1"
                  max="20"
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
                    fontWeight: "500",
                    textAlign: "center"
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
              <button
                onClick={incrementPeople}
                disabled={people >= 20}
                style={{
                  width: "48px",
                  height: "48px",
                  fontSize: "24px",
                  fontWeight: "600",
                  border: "2px solid #e1e5e9",
                  borderRadius: "12px",
                  backgroundColor: people >= 20 ? "#f5f5f5" : "#fafbfc",
                  color: people >= 20 ? "#ccc" : "#333",
                  cursor: people >= 20 ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (people < 20) {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.backgroundColor = "#f0edff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (people < 20) {
                    e.target.style.borderColor = "#e1e5e9";
                    e.target.style.backgroundColor = "#fafbfc";
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div style={{
          padding: "50px",
          background: "linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px"
            }}>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: 0,
                color: "#fff"
              }}>
                Summary
              </h2>
              {bill > 0 && (
                <button
                  onClick={copyToClipboard}
                  style={{
                    padding: "10px 16px",
                    fontSize: "13px",
                    fontWeight: "600",
                    backgroundColor: copied ? "#667eea" : "rgba(255,255,255,0.1)",
                    color: copied ? "#fff" : "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onMouseEnter={(e) => {
                    if (!copied) {
                      e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
                      e.target.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!copied) {
                      e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
                      e.target.style.color = "#94a3b8";
                    }
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            {bill > 0 ? (
              <>
                <div style={{
                  marginBottom: "32px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
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
                        fontSize: "28px",
                        fontWeight: "600",
                        color: "#fff"
                      }}>
                        {formatCurrency(billAmount)}
                      </div>
                    </div>
                  </div>

                  {tax > 0 && (
                    <>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                      }}>
                        <div>
                          <div style={{
                            fontSize: "14px",
                            color: "#94a3b8",
                            marginBottom: "4px"
                          }}>
                            Tax ({tax}%)
                          </div>
                          <div style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#94a3b8"
                          }}>
                            {formatCurrency(taxAmount)}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid rgba(255,255,255,0.1)"
                      }}>
                        <div>
                          <div style={{
                            fontSize: "14px",
                            color: "#94a3b8",
                            marginBottom: "4px"
                          }}>
                            Subtotal
                          </div>
                          <div style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#fff"
                          }}>
                            {formatCurrency(subtotal)}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    paddingBottom: tax > 0 ? "20px" : "24px",
                    borderBottom: tax > 0 ? "1px solid rgba(255,255,255,0.1)" : "none"
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
                        color: "#a78bfa"
                      }}>
                        {formatCurrency(rounding !== "none" ? adjustedTipAmount : tipAmount)}
                      </div>
                    </div>
                  </div>

                  {rounding !== "none" && (
                    <div style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginBottom: "12px",
                      fontStyle: "italic"
                    }}>
                      {rounding === "up" ? "↗ Rounded up" : "↘ Rounded down"}
                    </div>
                  )}

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
                        fontSize: "40px",
                        fontWeight: "700",
                        background: "linear-gradient(135deg, #fff 0%, #e0e7ff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        {formatCurrency(total)}
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
                        color: "#a78bfa"
                      }}>
                        {formatCurrency(perPerson)}
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
                setTax(0);
                setPeople(1);
                setRounding("none");
              }}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                marginTop: "auto"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #5568d3 0%, #6b4290 100%)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
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

