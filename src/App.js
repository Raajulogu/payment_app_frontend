import {QrScanner} from '@yudiel/react-qr-scanner';
import './App.css';
import { useState } from 'react';

function App() {
  let [result,setResult]=useState("")
  return (
    <div className="App">
    <h1>Hi</h1>
       <QrScanner
          onDecode={(result) => setResult(result)}
          onError={(error) => console.log(error?.message)}
      />
      {result && <div>
        {result}
      </div>}
    </div>
  );
}

export default App;
