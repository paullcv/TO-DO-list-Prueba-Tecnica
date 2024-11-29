import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]); // Aseguramos que sea un array vacío por defecto

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      if (data.status === 200) {
        setTasks(data.data || []); // Aseguramos que tasks nunca sea null
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/task/${id}`);
      if (response.data.status === 200) {
        getAllTasks();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Task List</h2>
        <Link to="/create" className="btn btn-success btn-lg text-white">
          Create Tasks
        </Link>
      </div>

      {/* Verificación de tareas vacías */}
      {tasks && tasks.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No tasks available. Please create a task.
        </div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="thead-dark bg-primary text-white">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td className="d-flex gap-2">
                  <Link to={`/edit/${task.id}`} className="btn btn-warning">
                    <i className="bi bi-pencil-fill fs-8 me-1"></i> Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash-fill fs-8 me-1"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowTasks;
