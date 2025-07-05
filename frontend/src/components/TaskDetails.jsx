import { useState } from "react"
import { BASE_URL } from "./BaseURL"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTasksContext } from "../hooks/useTaskContext"
import { formatDistanceToNow } from "date-fns"
import axios from "axios"
import "../styles/TaskDetails.css"

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedtask] = useState(task.task)
  const [editedCategory, setEditedCategory] = useState(task.category)
  const [editedInformation, setEditedInformation] = useState(task.information || "")
  const [editedDeadline, setEditedDeadline] = useState(task.deadline || "")
  const [editedCompleted, setEditedCompleted] = useState(task.completed)
  const [error, setError] = useState("")
  const [informationCharLimit] = useState(250)

  const handleClick = async () => {
    if (!user) return

    const response = await axios.delete(`${BASE_URL}/api/tasks/` + task._id, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    if (response.data) {
      dispatch({ type: 'DELETE_TASK', payload: response.data })
    }
  }

  const handleSave = async () => {
    if (!user) return

    const now = new Date();
    const selectedDeadline = new Date(editedDeadline);

    if (selectedDeadline < now) {
        setError("Deadline must be in the future.");
        return;
    }

    const updated = {
      ...task,
      task: editedTask,
      category: editedCategory,
      information: editedInformation,
      deadline: editedDeadline,
      completed: editedCompleted
    }

    const response = await axios.patch(`${BASE_URL}/api/tasks/` + task._id, updated, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    if (response.data) {
      dispatch({ type: 'UPDATE_TASK', payload: response.data })
      setIsEditing(false)
      setError("")
    }
  }

  const handleCancel = () => {
    setEditedtask(task.task)
    setEditedCategory(task.category)
    setEditedInformation(task.information || "")
    setEditedDeadline(task.deadline)
    setEditedCompleted(task.completed)
    setError("")
    setIsEditing(false)
  }

  return (
    <div className={`task-card ${isEditing ? 'editing' : task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <div className="form-group">
            <label htmlFor={`task-${task._id}`}>Task</label>
            <input
              id={`task-${task._id}`}
              type="text"
              value={editedTask}
              onChange={(e) => setEditedtask(e.target.value)}
              className="task-title-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`category-${task._id}`}>Category</label>
            <select
              id={`category-${task._id}`}
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="task-category-select"
              required
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Learning">Learning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`info-${task._id}`}>Additional Information</label>
            <textarea
              id={`info-${task._id}`}
              value={editedInformation}
              onChange={(e) => setEditedInformation(e.target.value)}
              className="task-info-edit"
              maxLength={informationCharLimit}
              placeholder="Optional description"
            />
            <div className="char-count">{editedInformation.length}/{informationCharLimit}</div>
          </div>

          <div className="form-group">
            <label htmlFor={`deadline-${task._id}`}>Deadline</label>
            <input
                id={`deadline-${task._id}`}
                type="datetime-local"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
                className="task-deadline-input"
                required
            />
          </div>

          <div className="task-completed-toggle">
            <input
              type="checkbox"
              id={`completed-${task._id}`}
              checked={editedCompleted}
              onChange={(e) => setEditedCompleted(e.target.checked)}
            />
            <label htmlFor={`completed-${task._id}`}>Mark as completed</label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="task-btn-group">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>

          
        </>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.task}</h3>
            <span className={`category-badge ${task.category.toLowerCase()}`}>{task.category}</span>
          </div>

          {task.information && <p className="task-info">{task.information}</p>}

          <p className="task-deadline">
            <span className="material-symbols-rounded">event</span>
            Due {formatDistanceToNow(new Date(task.deadline), { addSuffix: true })}, {new Date(task.deadline).toLocaleDateString('en-GB')}
          </p>

          <p className={`task-status ${task.completed ? 'done' : 'pending'}`}>
            <span className="material-symbols-rounded">
              {task.completed ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            {task.completed ? 'Completed' : 'Incomplete'}
          </p>

          <div className="task-btn-group">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-btn" onClick={handleClick}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskDetails