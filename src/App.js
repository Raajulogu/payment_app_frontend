import { QrScanner } from "@yudiel/react-qr-scanner";
import "./App.css";
import { useEffect, useState } from "react";
import { Box, Button, Snackbar, TextField } from "@mui/material";

function App() {
  const [result, setResult] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    let temp = result.split(",");
    setPrice(temp[0]);
    setProduct(temp[1]);
  }, [result]);

  // handle payment
  function handlePayment() {
    if(pin.length<4 ){
      alert("Please Enter a valid 4 Digit PIN");
      return 0
    }
    setSnackbarOpen(true);
    setPin("")
    setResult("")
  }

  // Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); 
  };

  return (
    <div className="App">
      {result ? (
        <div className="payment-page">
          {show ? (
            <div className="pin-card">
              <TextField
                id="pin"
                label="PIN"
                type="number"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <div>
                <Button variant="contained" onClick={() => handlePayment()}>
                  Enter
                </Button>
              </div>
            </div>
          ) : (
            <div className="payment-card">
              <TextField
                disabled
                id="amount"
                label="Amount"
                defaultValue={price}
              />
              <br />
              <TextField
                disabled
                id="product"
                label="Product"
                defaultValue={product}
              />
              <br />
              <Button onClick={() => setShow(!show)} variant="contained">
                Pay
              </Button>
            </div>
          )}
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
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
          message="Payment Completed Successfully"
        />
      </Box>
    </div>
  );
}

export default App;
