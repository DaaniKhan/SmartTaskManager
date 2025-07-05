import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// Pages and Components
import Navbar from "./components/Navbar"
import Landing from "./pages/landing"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  const { user } = useAuthContext() 

  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <div className="pages">
            <Routes>
              <Route 
                path="/"
                element={!user ? <Landing /> : <Navigate to="/home" />}
              />
              <Route 
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/home" />}
              />
              <Route 
                path="/login"
                element={!user ? <Login /> : <Navigate to="/home" />}
              />
              <Route 
                path="/home"
                element={user ? <Home /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App