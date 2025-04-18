// src/components/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential
      await setDoc(doc(db, "users", user.uid), {
        email, userType, createdAt: new Date(),
      });
      navigate("/home");
    } catch (err) {
      let customMessage = "Something went wrong. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          customMessage = "This email is already registered.";
          break;
        case "auth/invalid-email":
        customMessage = "Please enter a valid email address.";
        break;
      case "auth/weak-password":
        customMessage = "Password should be at least 6 characters.";
        break;
      case "auth/missing-password":
        customMessage = "Please enter a password.";
        break;
      default:
        customMessage = err.message; // fallback to Firebase message
    }

    alert(customMessage); // or setError(customMessage) if showing inline
  }
};

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <div>
        <label>
          <input type="radio" value="Student" checked={userType === "Student"} onChange={e => setUserType(e.target.value)} /> Student
        </label>
        <label>
          <input type="radio" value="Employer" checked={userType === "Employer"} onChange={e => setUserType(e.target.value)} /> Employer
        </label>
      </div>
      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <a href="/">Log In</a></p>
    </div>
  );
}

export default Signup;