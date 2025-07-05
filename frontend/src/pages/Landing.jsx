import "../styles/Landing.css"

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <section className="hero">
        <div className="landing-container">
          <h1>Welcome to <span className="brand-logo">Smart Task Manager</span></h1>
          <p>
            Organize your goals, set deadlines and stay in control.
          </p>
          <button className="hero-btn" onClick={() => window.location.href = "/signup"}>
            <span className="material-symbols-rounded">check_circle</span>
            Get Started
          </button>
        </div>
      </section>

      <section className="features-section">
        <div className="landing-container feature-grid">
          <div className="feature-card">
            <span className="material-symbols-rounded feature-icon">task_alt</span>
            <h3 className="feature-title">Task Organization</h3>
            <p className="feature-desc">
              Categorize tasks into Work, Personal, and Learning buckets for total clarity.
            </p>
          </div>

          <div className="feature-card">
            <span className="material-symbols-rounded feature-icon">schedule</span>
            <h3 className="feature-title">Deadlines & Reminders</h3>
            <p className="feature-desc">
              Set deadlines and receive timely reminders so nothing falls through the cracks.
            </p>
          </div>

          <div className="feature-card">
            <span className="material-symbols-rounded feature-icon">sync_alt</span>
            <h3 className="feature-title">Cross-Device Sync</h3>
            <p className="feature-desc">
              Seamlessly manage tasks across devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing