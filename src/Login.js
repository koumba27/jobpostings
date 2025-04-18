import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default to student
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate based on selected role
      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "employer") {
        navigate("/employer-dashboard");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <div>
        <label>
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={e => setRole(e.target.value)}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="employer"
            checked={role === "employer"}
            onChange={e => setRole(e.target.value)}
          />
          Employer
        </label>
      </div>

      <button onClick={handleLogin}>Log In</button>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
