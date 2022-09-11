import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChangePassword from "./Components/ChangePassword";
import Contact from "./Components/Contact";
import Dashboard from "./Components/Dashboard";
import ForgotePassword from "./Components/ForgotePassword";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Layout from "./Components/pages/Layout";
import Registration from "./Components/Registration";
import ResetPassword from "./Components/ResetPassword";

function App() {
  const {token}=useSelector(state=>state.auth);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={!token ? <Login /> : <Navigate to="/dashboard" replace/>} />
          <Route path="registration" element={!token ? <Registration /> : <Navigate to="/dashboard" />} />
          <Route path="forgotpassword" element={<ForgotePassword />} />
          <Route
            path="user/resetpassword/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="resetpassword" element={<ResetPassword />} />
          
          <Route path="/dashboard" element={token? <Dashboard />:<Navigate to="/login"/>} />
          <Route path="/changepasword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
