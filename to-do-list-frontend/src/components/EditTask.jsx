import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(""); // Estado para mostrar errores

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (event) => {
    event.preventDefault();

    // Validación para asegurarse de que los campos no están vacíos
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required and cannot be empty.");
      return;
    }

    try {
      const response = await api.put(`/task/${id}`, {
        title,
        description,
        completed
      });

      if (response.data.status === 200) { 
        console.log(response.data.message); 
        navigate('/'); 
      } else {
        console.error(response.data.message); 
        setError("There was an issue updating the task.");
      }
    } catch (error) {
      console.error("Error updating task", error);
      setError("An unexpected error occurred while updating the task.");
    }
  };

  const getTaskById = async () => {
    try {
      const {data} = await api.get(`/task/${id}`);
      console.log(data.status);
      console.log(data.message);
      console.log(data.data);

      if (data.status === 200) {
        const task = data.data;
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
      } else {
        console.error(data.message); 
      }
    } catch (error) {
      console.error("Error fetching task", error);
      setError("An error occurred while fetching the task details.");
    }
  };

  useEffect(() => {
    getTaskById();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-primary">Edit Task</h3>

      <form onSubmit={update} className="shadow p-4 rounded bg-light">
        {/* Mostrar mensaje de error si hay */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control"
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="form-control"
            required
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
            className="form-check-input"
          />
          <label className="form-check-label">Completed</label>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success btn-lg">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
