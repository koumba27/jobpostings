// filepath: c:\Users\Koumba\Downloads\task tracker\task-tracker\src\App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./StudentDashboard";
import StudentDashboard from "./StudentDashboard";  // ⬅️ Add this file
import EmployerDashboard from "./EmployerDashboard"; // ⬅️ Add this file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
