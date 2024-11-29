import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateTask = () => {
  // Usa useRef para campos de formulario para mejor rendimiento
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const completedRef = useRef(null);

  const [error, setError] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Memoriza la función de almacenamiento con useCallback
  const store = useCallback(async (event) => {
    event.preventDefault();

    // Obtén valores directamente de las referencias
    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const completed = completedRef.current.checked;

    // Validación
    if (!title || !description) {
      setError("Both title and description are required and cannot be empty.");
      return;
    }

    // Previene múltiples envíos simultáneos
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError("");

      const { data } = await api.post("/task", {
        title,
        description,
        completed,
      });

      if (data.status === 201) {
        navigate("/");
      } else {
        setError(data.message || "There was an issue creating the task.");
      }
    } catch (error) {
      console.error("Error creating task", error);
      setError("An unexpected error occurred while creating the task.");
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, isSubmitting]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-primary">Create Task</h3>

      <form onSubmit={store} className="shadow p-4 rounded bg-light">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            className="form-control"
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            ref={descriptionRef}
            className="form-control"
            required
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="completed"
            ref={completedRef}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>

        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-success btn-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;