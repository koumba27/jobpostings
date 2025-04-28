// src/EmployerDashboard.js
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import styles from "./EmployerDashboard.module.css";

function EmployerDashboard() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");

  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handlePostJob = async () => {
    if (!title || !company || !location || !description) {
      setStatus("❗ Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        title,
        company,
        location,
        description,
        postedAt: serverTimestamp(),
      });

      setStatus("✅ Job posted!");
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      fetchJobs(); // refresh the list
    } catch (error) {
      console.error("Error posting job:", error);
      setStatus("❌ Error posting job.");
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setStatus("🗑️ Job deleted.");
      fetchJobs(); // refresh the list
    } catch (error) {
      console.error("Error deleting job:", error);
      setStatus("❌ Failed to delete job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={styles.dashboardcontainer}>
      <h1>🏢 Employer Dashboard</h1>
      
      <div className={styles.contentWrapper}>  
      
        {/* Form Container */}
        <div className={styles.postJobContainer}>
          <p>Post a new job listing:</p>

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <button onClick={handlePostJob} className={styles.postButton}>📤 Post Job</button>
          {status && <p>{status}</p>}
        </div>

        {/* Job List Container */}
        <div className={styles.jobListContainer}>
          <h2>📋 Your Posted Jobs</h2>

          {jobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            <ul>
              {jobs.map((job) => (
                <li key={job.id}>
                  <strong>{job.title}</strong> at <em>{job.company}</em>
                  <br />
                  📍 {job.location}
                  <br />
                  📝 {job.description}
                  <br />
                  <button onClick={() => handleDeleteJob(job.id)} className={styles.deleteButton}>❌ Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}


export default EmployerDashboard;
