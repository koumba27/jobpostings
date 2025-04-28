// src/StudentDashboard.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
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

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎓 Student Dashboard</h1>
      <p>Browse and apply for job opportunities:</p>

      {jobs.length === 0 ? (
        <p>No jobs available right now.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} style={{ marginBottom: "1rem" }}>
              <strong>{job.title}</strong> at <em>{job.company}</em>
              <br />
              📍 {job.location}
              <br />
              📝 {job.description}
              <br />
              {job.applicationLink && (
                <>
                  🔗 <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                    Apply Here
                  </a>
                  <br />
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentDashboard;