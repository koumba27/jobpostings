import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save role to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role
      });

      // Navigate based on role
      if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/employer-dashboard");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

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

      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <a href="/">Log In</a></p>
    </div>
  );
}

export default Signup;
