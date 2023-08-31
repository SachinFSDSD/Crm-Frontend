import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Engineer from "./pages/Engineer";
// import NotFound from "./pages/NotFound";
// import Unauth from "./pages/Unauthorized";
// import RequireAuth from "./components/RequireAuth";

import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui/dist/js/coreui.min.js";
import "react-circular-progressbar/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

// const ROLES = {
//   CUSTOMER: "CUSTOMER",
//   ADMIN: "ADMIN",
//   ENGINEER: "ENGINEER",
// };
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/engineer" element={<Engineer />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// Password:mrigank
