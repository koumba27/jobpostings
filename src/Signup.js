//src/components/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

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
      if (userType === "student") {
        navigate("/student-dashboard")
      } else {
        navigate("/employer-dashboard")
      }
      
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
    <div className={styles.loginContainer}>
      <h2 className={styles.heading}>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className={styles.inputField}/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className={styles.inputField}/>
      <div className={styles.radioButtons}>
        <input
          type="radio"
          id="student"
          value="student"
          checked={userType === "student"}
          onChange={(e) => setUserType(e.target.value)}
          className={styles.radioInput}
        />
        <label htmlFor="student" className={styles.radioLabel}>Student</label>

        <input
          type="radio"
          id="employer"
          value="employer"
          checked={userType === "employer"}
          onChange={(e) => setUserType(e.target.value)}
          className={styles.radioInput}
        />
        <label htmlFor="employer" className={styles.radioLabel}>Employer</label>
      </div>
      <button onClick={handleSignup} className={styles.loginButton}>Sign Up</button>
      <p>Already have an account? <a href="/" className={styles.signupLink}>Log In</a></p>
    </div>
  );
}

export default Signup;