import "../styles/Home.css"
import TaskForm from "../components/taskForm"

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="task-form-pane">
        <TaskForm />
      </div>
      <div className="task-list-pane">
        
      </div>
    </div>
  )
}

export default Home