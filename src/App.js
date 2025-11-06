import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on first render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <form onSubmit={addTask} className="todo-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((t) => (
            <li key={t.id} className={t.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(t.id)}>{t.text}</span>
              <button onClick={() => deleteTask(t.id)}>✕</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
