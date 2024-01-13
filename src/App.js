import { QrScanner } from "@yudiel/react-qr-scanner";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [result, setResult] = useState("");
  let [price, setPrice] = useState("");
  let [product, setProduct] = useState("");
  useEffect(()=>{
    // let temp=result.split(",")
  },[result])
  return (
    <div className="App">
      {result ? (
        <div className="payment-page">


        </div>
      ) : (
        <div>
          <h1>Scan QR code here</h1>
          <QrScanner
            onDecode={(result) => setResult(result)}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      )}
      {result && <div>{result}</div>}
    </div>
  );
}

export default App;
