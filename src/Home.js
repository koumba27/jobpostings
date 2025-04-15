import React, { useEffect, useState } from "react";
import { db, auth } from "./firebaseConfig";
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const addTask = async () => {
    if (taskInput.trim() !== "") {
      await addDoc(collection(db, "tasks"), {
        text: taskInput,
        completed: false
      });
      setTaskInput("");
    }
  };

  const toggleComplete = async (id, current) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, { completed: !current });
  };

  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h2>Task Tracker</h2>
      <input
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task.id, task.completed)}
              style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default Home;
