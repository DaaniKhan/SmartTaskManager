import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Pages and Components
import Navbar from "./components/Navbar"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <div className="pages">
            <Routes>
              
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
