import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Pages and Components
import Navbar from "./components/Navbar"
import Landing from "./pages/landing"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Landing />}
              />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
