import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from './context/AuthContext';
import { TasksContextProvider } from "./context/TaskContext"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
