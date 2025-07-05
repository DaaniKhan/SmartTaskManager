import { useState } from "react"
import { useTasksContext } from "../hooks/useTaskContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { BASE_URL } from "./BaseURL"
import axios from "axios"
import '../styles/TaskForm.css'

const TaskForm = () => {
  const { dispatch } = useTasksContext()

  const [task, setTask] = useState('')
  const [category, setCategory] = useState('')
  const [information, setInformation] = useState('')
  const [deadline, setDeadline] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [infoCharLimit] = useState(250)
  const [error, setError] = useState(null)

  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      return
    }

    const now = new Date();
    const selectedDeadline = new Date(deadline);

    if (selectedDeadline < now) {
        setError("Deadline must be in the future.");
        return;
    }

    setLoading(true)

    const newTask = {
      task,
      category,
      information,
      deadline,
      completed
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      setTask('')
      setCategory('')
      setInformation('')
      setDeadline('')

      dispatch({type: 'CREATE_TASK', payload: response.data})
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || "Something went wrong while adding the task.";
        
        setError(message);
        console.error('Axios error:', error.response?.status, error.response?.data)
      } else {
        setError("An unexpected error occured")
        console.error('Unexpected error:', error)
      }
    } finally {
      setError(null)
      setLoading(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
        <h2>Create a Task</h2>

        <label>Task</label>
        <input
            type="text"
            required
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Do homework"
        />

        <label>Category</label>
        <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="">Select a category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
            <option value="Other">Other</option>
        </select>

        <label>Additional Info</label>
        <textarea
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            maxLength={infoCharLimit}
            placeholder="Optional notes or description"
        />
        <p className="char-count">{information.length}/{infoCharLimit} characters</p>

        <label>Deadline</label>
        <input
            type="datetime-local"
            required
            min={new Date().toISOString().slice(0, 16)} 
            value={deadline || ""}
            onChange={(e) => setDeadline(e.target.value)}
        />


        {error && <div className="form-error">{error}</div>}

        <div className="form-buttons">
        <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
        </button>
        <button
            type="button"
            className="clear-btn"
            onClick={() => {
                setTask("")
                setCategory("")
                setInformation("")
                setDeadline("")
                setCompleted(false)
                setError("")
            }}
        >
            Clear
        </button>
        </div>
    </form>
    )

}

export default TaskForm