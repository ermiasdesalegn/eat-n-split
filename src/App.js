import { useEffect, useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [percent, setPercent] = useState(0);
  const [percentFriend, setPercentFriend] = useState(0);
  const [numPeople, setNumPeople] = useState(2);
  const [customTip, setCustomTip] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [copied, setCopied] = useState(false);

  function handlePercent(e) {
    setPercent(Number(e.target.value));
  }

  function handlePercentFriend(e) {
    setPercentFriend(Number(e.target.value));
  }

  function handleBill(e) {
    setBill(e.target.value ? Number(e.target.value) : "");
  }

  function handleQuickTip(value) {
    setCustomTip("");
    setUseCustom(false);
    setPercent(value);
    setPercentFriend(value);
  }

  const avgPercent = useCustom ? (customTip ? Number(customTip) : 0) : (percent + percentFriend) / 2;
  const tip = bill ? Math.round((0.01 * bill * avgPercent) * 100) / 100 : 0;
  const total = bill ? bill + tip : 0;
  const perPerson = bill > 0 && avgPercent > 0 && numPeople > 0 ? total / numPeople : 0;

  function copyToClipboard() {
    const text = `Bill: $${bill}\nTip: $${tip.toFixed(2)} (${avgPercent.toFixed(1)}%)\nTotal: $${total.toFixed(2)}\nPer Person: $${perPerson.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
          <span style={{ fontSize: "48px" }}>💰</span>
          <h1 style={{
            textAlign: "center",
            color: "#40e0d0",
            fontSize: "42px",
            fontWeight: "bold",
            fontFamily: "'Segoe UI', sans-serif",
            letterSpacing: "-1px",
            margin: 0
          }}>
            Tip Calculator
          </h1>
        </div>
        <p style={{
          textAlign: "center",
          color: "#8892b0",
          marginBottom: "40px",
          fontSize: "15px",
          fontWeight: "300"
        }}>
          Calculate your tip & split evenly 💸
        </p>
        
        <BillInput bill={bill} handleBill={handleBill} />
        
        {/* Quick Tip Buttons */}
        {!useCustom && (
          <QuickTipButtons
            percent={percent}
            percentFriend={percentFriend}
            onQuickTip={handleQuickTip}
          />
        )}
        
        {/* Mode Toggle */}
        <div style={{
          marginBottom: "30px",
          display: "flex",
          gap: "12px",
          padding: "8px",
          background: "rgba(15, 22, 41, 0.5)",
          borderRadius: "12px"
        }}>
          <button
            onClick={() => setUseCustom(false)}
            style={{
              flex: 1,
              padding: "12px",
              background: useCustom ? "transparent" : "linear-gradient(135deg, #40e0d0 0%, #00c9ff 100%)",
              color: useCustom ? "#8892b0" : "#0a0e27",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            <span>👥</span> Split Opinion
          </button>
          <button
            onClick={() => setUseCustom(true)}
            style={{
              flex: 1,
              padding: "12px",
              background: !useCustom ? "transparent" : "linear-gradient(135deg, #40e0d0 0%, #00c9ff 100%)",
              color: !useCustom ? "#8892b0" : "#0a0e27",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            <span>✏️</span> Custom Tip
          </button>
        </div>

        {useCustom ? (
          <CustomTipInput
            customTip={customTip}
            setCustomTip={setCustomTip}
          />
        ) : (
          <>
            <PercentageSelect
              placeholder="How did you like the service? "
              percent={percent}
              handlePercent={handlePercent}
              disabled={useCustom}
            />
            <PercentageSelect
              placeholder="How did your friend like the service? "
              handlePercent={handlePercentFriend}
              percent={percentFriend}
              disabled={useCustom}
            />
          </>
        )}
        
        <PeopleSelector
          numPeople={numPeople}
          setNumPeople={setNumPeople}
        />
        
        {bill > 0 && (
          <div style={{
            marginTop: "45px",
            padding: "35px",
            background: "rgba(26, 31, 58, 0.5)",
            borderRadius: "20px",
            border: "1px solid rgba(64, 224, 208, 0.2)",
            animation: "fadeIn 0.5s ease-in"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px"
            }}>
              <h2 style={{
                color: "#40e0d0",
                fontSize: "22px",
                fontWeight: "600",
                margin: 0
              }}>
                📊 Breakdown
              </h2>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  background: copied ? "rgba(64, 224, 208, 0.2)" : "transparent",
                  color: copied ? "#40e0d0" : "#8892b0",
                  border: "1px solid rgba(64, 224, 208, 0.3)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    e.target.style.borderColor = "#40e0d0";
                    e.target.style.color = "#40e0d0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    e.target.style.borderColor = "rgba(64, 224, 208, 0.3)";
                    e.target.style.color = "#8892b0";
                  }
                }}
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "18px",
              marginBottom: "25px"
            }}>
              <div style={{
                padding: "20px",
                backgroundColor: "#0f1629",
                borderRadius: "16px",
                border: "1px solid rgba(64, 224, 208, 0.1)",
                transition: "all 0.3s"
              }}>
                <div style={{ color: "#8892b0", fontSize: "13px", marginBottom: "8px", fontWeight: "400" }}>💵 Bill</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#fff" }}>
                  ${bill}
                </div>
              </div>
              
              <div style={{
                padding: "20px",
                backgroundColor: "#0f1629",
                borderRadius: "16px",
                border: "1px solid rgba(64, 224, 208, 0.1)",
                transition: "all 0.3s"
              }}>
                <div style={{ color: "#8892b0", fontSize: "13px", marginBottom: "8px", fontWeight: "400" }}>💰 Tip ({avgPercent.toFixed(1)}%)</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#40e0d0" }}>
                  ${tip.toFixed(2)}
                </div>
              </div>
              
              <div style={{
                padding: "20px",
                backgroundColor: "#0f1629",
                borderRadius: "16px",
                border: "1px solid rgba(64, 224, 208, 0.1)",
                transition: "all 0.3s"
              }}>
                <div style={{ color: "#8892b0", fontSize: "13px", marginBottom: "8px", fontWeight: "400" }}>👥 People</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#40e0d0" }}>
                  {numPeople}
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
                  🎯 Per Person (Split)
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
              setCustomTip={setCustomTip}
              setUseCustom={setUseCustom}
              setNumPeople={setNumPeople}
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
        💳 How much was the bill?
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

function PercentageSelect({ placeholder, handlePercent, percent, disabled }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "12px",
        fontWeight: "500",
        color: "#8892b0",
        fontSize: "15px"
      }}>
        {placeholder}
      </label>
      <select
        onChange={handlePercent} 
        value={percent}
        disabled={disabled}
        style={{
          padding: "16px 20px",
          fontSize: "18px",
          borderRadius: "12px",
          border: "1px solid rgba(64, 224, 208, 0.2)",
          backgroundColor: "#0f1629",
          color: "#fff",
          width: "100%",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s",
          outline: "none",
          opacity: disabled ? 0.5 : 1
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.target.style.borderColor = "#40e0d0";
            e.target.style.boxShadow = "0 0 0 4px rgba(64, 224, 208, 0.1)";
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.target.style.borderColor = "rgba(64, 224, 208, 0.2)";
            e.target.style.boxShadow = "none";
          }
        }}
      >
        <option value={0} style={{ backgroundColor: "#0f1629", color: "#fff" }}>Dissatisfied (0%)</option>
        <option value={5} style={{ backgroundColor: "#0f1629", color: "#fff" }}>It was okay (5%)</option>
        <option value={10} style={{ backgroundColor: "#0f1629", color: "#fff" }}>It was good (10%)</option>
        <option value={20} style={{ backgroundColor: "#0f1629", color: "#fff" }}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Reset({ setBill, setPercent, setPercentFriend, setCustomTip, setUseCustom, setNumPeople }) {
  return (
    <button
      onClick={() => {
        setBill("");
        setPercent(0);
        setPercentFriend(0);
        setCustomTip("");
        setUseCustom(false);
        setNumPeople(2);
      }}
      style={{
        padding: "18px 36px",
        fontSize: "17px",
        background: "linear-gradient(135deg, #40e0d0 0%, #00c9ff 100%)",
        color: "#0a0e27",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "600",
        width: "100%",
        transition: "all 0.3s",
        boxShadow: "0 4px 15px rgba(64, 224, 208, 0.4)"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 8px 25px rgba(64, 224, 208, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 15px rgba(64, 224, 208, 0.4)";
      }}
      >
        🔄 Reset & Calculate
      </button>
  );
}

function QuickTipButtons({ percent, percentFriend, onQuickTip }) {
  const tips = [10, 15, 18, 20];
  
  return (
    <div style={{ marginBottom: "30px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "12px",
        fontWeight: "500",
        color: "#8892b0",
        fontSize: "15px"
      }}>
        ⚡ Quick Tip
      </label>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px"
      }}>
        {tips.map(tip => (
          <button
            key={tip}
            onClick={() => onQuickTip(tip)}
            style={{
              padding: "14px",
              fontSize: "16px",
              borderRadius: "12px",
              border: percent === tip && percentFriend === tip 
                ? "2px solid #40e0d0" 
                : "1px solid rgba(64, 224, 208, 0.2)",
              backgroundColor: percent === tip && percentFriend === tip
                ? "rgba(64, 224, 208, 0.15)"
                : "#0f1629",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              if (percent !== tip || percentFriend !== tip) {
                e.target.style.borderColor = "#40e0d0";
                e.target.style.backgroundColor = "rgba(64, 224, 208, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (percent !== tip || percentFriend !== tip) {
                e.target.style.borderColor = "rgba(64, 224, 208, 0.2)";
                e.target.style.backgroundColor = "#0f1629";
              }
            }}
          >
            {tip}%
          </button>
        ))}
      </div>
    </div>
  );
}

function CustomTipInput({ customTip, setCustomTip }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "12px", 
        fontWeight: "500",
        color: "#8892b0",
        fontSize: "15px"
      }}>
        ✏️ Custom Tip Percentage
      </label>
      <input 
        type="number" 
        value={customTip} 
        onChange={(e) => setCustomTip(e.target.value)}
        placeholder="Enter tip % (e.g., 15)"
        min="0"
        max="100"
        step="0.1"
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

function PeopleSelector({ numPeople, setNumPeople }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "12px",
        fontWeight: "500",
        color: "#8892b0",
        fontSize: "15px"
      }}>
        👥 How many people?
      </label>
      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "center"
      }}>
        <button
          onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
          style={{
            padding: "12px 20px",
            fontSize: "20px",
            borderRadius: "12px",
            border: "1px solid rgba(64, 224, 208, 0.2)",
            backgroundColor: "#0f1629",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#40e0d0";
            e.target.style.backgroundColor = "rgba(64, 224, 208, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(64, 224, 208, 0.2)";
            e.target.style.backgroundColor = "#0f1629";
          }}
        >
          −
        </button>
        
        <input
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(Number(e.target.value) || 1)}
          min="1"
          max="20"
          style={{
            flex: 1,
            padding: "16px 20px",
            fontSize: "18px",
            textAlign: "center",
            borderRadius: "12px",
            border: "1px solid rgba(64, 224, 208, 0.2)",
            backgroundColor: "#0f1629",
            color: "#fff",
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
        
        <button
          onClick={() => setNumPeople(Math.min(20, numPeople + 1))}
          style={{
            padding: "12px 20px",
            fontSize: "20px",
            borderRadius: "12px",
            border: "1px solid rgba(64, 224, 208, 0.2)",
            backgroundColor: "#0f1629",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#40e0d0";
            e.target.style.backgroundColor = "rgba(64, 224, 208, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(64, 224, 208, 0.2)";
            e.target.style.backgroundColor = "#0f1629";
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;