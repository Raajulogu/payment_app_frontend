import { QrScanner } from "@yudiel/react-qr-scanner";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Box, Button, Snackbar, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

function Dashboard() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isPin, setIsPin] = useState(false)

    //Render on result change
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    try {
      let temp = result.split("/");
      if (temp.length > 1) {
        setPrice(temp[0]);
        setProduct(temp[1]);
      } else {
        throw new Error("Invalid QR code format");
      }
    } catch (error) {
      console.error("Error decoding QR code:", error);
    }
  }, [result]);

  //Firrst Render
  useEffect(async ()=>{
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // let response = await axios.get(
    //     `${api_url}/user/get-user`,{
    //         headers: {
    //             'x-auth': token,
    //           },
    //     }
        
    //   );

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);

    // Retrieve data from URL parameters
    const name = params.get("name");
    const price = params.get("price");
    const user = params.get("user");
    const app = params.get("app");

    if(name && price && user && app){
      setResult(`${price}/${name}`)
    }
    // Now you can use the retrieved data as needed
    console.log("Product Name:", name);
    console.log("Price:", price);
    console.log("User:", user);
    console.log("App:", app);
  },[])

  useEffect(() => {
    
  }, []);

  // handle payment
  function handlePayment() {
    if (pin.length < 4) {
      alert("Please Enter a valid 4 Digit PIN");
      return 0;
    }
    setSnackbarOpen(true);
    setPin("");
    setResult("");
  }

  // Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="Home">
        <div className="">

        </div>

      {result ? (
        <div className="payment-page">
          {show && price && product ? (
            <PinCard pin={pin} setPin={setPin} handlePayment={handlePayment}/>
          ) : (
            <PaymentDetail show={show} setShow={setShow} price={price} product={product} />
          )}
        </div>
      ) : (
        <Scanner setResult={setResult} />
      )} 
      <br />
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
          message="Payment Completed Successfully"
        />
      </Box>
    </div>
  );
}

function Scanner({ setResult }) {
  return (
    <div className="scanner">
      <h1>Scan QR code here</h1>
      <QrScanner
        onDecode={(result) => setResult(result)}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
}

function PaymentDetail({ show,setShow, price, product }) {
  return (
    <div className="payment-card">
      <h4>Click Pay to proceed payment</h4>
      <TextField
        disabled
        id="amount"
        label="Amount"
        value={price}
        InputProps={{ readOnly: true }}
      />
      <br />
      <TextField
        disabled
        id="product"
        label="Product"
        value={product}
        InputProps={{ readOnly: true }}
      />
      <br />
      <Button onClick={() => setShow(!show)} variant="contained">
        Pay
      </Button>
    </div>
  );
}

function PinCard({ pin, setPin,handlePayment }) {
  return (
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
  );
}

export default Dashboard;
