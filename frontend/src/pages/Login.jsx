import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import "../styles/Login.css"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await login(email, password)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Welcome Back</h2>

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

        <button disabled={isLoading} type="submit" className="login-button">
          <span className="material-symbols-rounded">login</span>
          Log In
        </button>

        {error && <div className="signup-error">{error}</div>}

        <div className="login-separator">
          <span className="line" />
          <span className="or-text">or</span>
          <span className="line" />
        </div>

        <button className="signup-redirect-btn" onClick={() => window.location.href = '/signup'}>
          <span className="material-symbols-rounded">person_add</span>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Login