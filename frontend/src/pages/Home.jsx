import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTasksContext } from "../hooks/useTaskContext"
import { BASE_URL } from "../components/BaseURL"
import { formatDistanceToNow } from "date-fns"
import axios from "axios"
import TaskForm from "../components/TaskForm"
import TaskDetails from "../components/TaskDetails"
import "../styles/Home.css"

const Home = () => {
    const [categoryFilter, setCategoryFilter] = useState("All");

    const { tasks, dispatch } = useTasksContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get(`${BASE_URL}/api/tasks`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            dispatch({type: 'SET_TASKS', payload: response.data})
        }
        
        if (user) {
            fetchTasks()
        }

    }, [dispatch, user])

    const filteredTasks = ((categoryFilter === "All" ? tasks : tasks?.filter(
            (task) => task.category === categoryFilter
        )) || []).slice().sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    
        const upcomingTasks = filteredTasks.filter(task => {
            const now = new Date()
            const deadline = new Date(task.deadline)
            const timeDiff = deadline - now
            return timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000
        })


  
  return (
    <div className="home-wrapper">
      <div className="task-form-pane">
        <TaskForm />
      </div>
      <div className="task-list-pane">
        <div className="task-list-header">
          <h1 className="task-section-title">Your Tasks</h1>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="task-filter-dropdown"
          >
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {upcomingTasks.length > 0 && (
            <div className="reminder-banner">
                <h4>⏰ Upcoming Deadlines</h4>
                <ul>
                {upcomingTasks
                .filter((t) => !t.completed)
                .map((t) => (
                    <li key={t._id}>
                        <strong>{t.task}</strong> due in{" "}
                        {formatDistanceToNow(new Date(t.deadline), { addSuffix: true })} ({t.category})
                          
                    </li>
                ))}

                </ul>
            </div>
        )}


        {filteredTasks?.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskDetails key={task._id} task={task} />
          ))
        ) : (
          <p>No tasks found in this category.</p>
        )}
      </div>
    </div>
  )
}

export default Home