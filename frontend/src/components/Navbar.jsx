import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <header>
        <div className="container">

                <Link to="/" className="logo">
                    <h1>Smart Task Manager</h1>
                </Link>

            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="material-symbols-rounded">
                    {menuOpen ? 'close' : 'menu'}
                </span>
            </div>

            <div className="user-section">
                <Link to="/login" className="login-btn">Log In</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar