import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import "../styles/Signup.css"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 1000)

    await signup(email, password)
  }

  return (
    <div className="signup-container fade-in">
      <form className={`signup-form ${submitted ? "bounce" : ""}`} onSubmit={handleSubmit}>
        <h2 className="signup-heading">Create an Account</h2>

        <label>Email</label>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label>Password</label>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button disabled={isLoading} type="submit" className="signup-button">
          <span className="material-symbols-rounded">person_add</span>
          Sign Up
        </button>

        {error && <div className="signup-error">{error}</div>}

        <div className="signup-separator">
            <span className="line" />
            <span className="or-text">or</span>
            <span className="line" />
        </div>

        <button className="login-redirect-btn" onClick={() => window.location.href = '/login'}>
            <span className="material-symbols-rounded">login</span>
            Log In
        </button>
      </form>
    </div>
  )
}

export default Signup