import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student"); // Default to "student"
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Check if email is provided
      if (!email) {
        alert("Email is required.");
        return;
      }

      // Check if the email ends with "@villanova.edu"
      if (!email.endsWith("@villanova.edu")) {
        alert("Only Villanova.edu emails are allowed.");
        return;
      }

      // Proceed with Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        userType,
        createdAt: new Date(),
      });

      // Navigate based on user type
      if (userType === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/employer-dashboard");
      }
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="student">Student</option>
        <option value="employer">Employer</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;