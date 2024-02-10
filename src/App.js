import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
