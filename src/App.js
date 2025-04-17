import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('splash');

  // Simulate splash + loading
  useEffect(() => {
    setTimeout(() => setPage('loading'), 2000); // Show splash for 2s
    setTimeout(() => setPage('auth'), 4000); // Then loading for 2s, then auth
  }, []);

  // State for login/register (not real auth for now)
  const [isRegistered, setIsRegistered] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for issue reporting
  const departments = ["Electrical", "Plumbing", "IT Services", "Housekeeping", "Mechanical", "Civil"];
  const issuesByDept = {
    Electrical: ["Wire issue", "Sockets/Plugs broken", "Fan/AC not working", "Classroom lighting"],
    Plumbing: ["Leakage", "Clogged drains"],
    "IT Services": ["WiFi down", "PC not working", "LAN issue"],
    Housekeeping: ["Lab cleanliness", "Classroom hygiene"],
    Mechanical: ["Lab equipment issue"],
    Civil: ["Flooring broken", "Window glass cracked"]
  };
  const priorities = ["Extreme", "High", "Medium", "Low"];
  const [department, setDepartment] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (username && password) {
      setPage('main');
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    const data = { department, issue, priority, location, description };
    console.log('Submitted:', data);
    alert('Issue submitted successfully!');
  };

  // Render based on page state
  if (page === 'splash') {
    return (
      <div className="centered">
        <img src="/logo.png" alt="Logo" style={{ width: '120px' }} />
        <h1>Rungta Fixit</h1>
      </div>
    );
  }

  if (page === 'loading') {
    return (
      <div className="centered">
        <h2>Please wait...</h2>
      </div>
    );
  }

  if (page === 'auth') {
    return (
      <div className="centered">
        <h2>{isRegistered ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleAuth} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">{isRegistered ? 'Login' : 'Register'}</button>
          <p onClick={() => setIsRegistered(!isRegistered)} style={{ cursor: 'pointer', color: 'blue' }}>
            {isRegistered ? 'New user? Register here' : 'Already registered? Login'}
          </p>
        </form>
      </div>
    );
  }

  // Main Issue Form
  return (
    <div className="container">
      <h1>Rungta Fixit</h1>
      <form onSubmit={handleIssueSubmit}>
        <label>Department</label>
        <select value={department} onChange={e => setDepartment(e.target.value)} required>
          <option value="">Select Department</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <label>Issue</label>
        <select value={issue} onChange={e => setIssue(e.target.value)} required>
          <option value="">Select Issue</option>
          {department && issuesByDept[department]?.map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <label>Priority</label>
        <select value={priority} onChange={e => setPriority(e.target.value)} required>
          <option value="">Select Priority</option>
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="E.g., Lab B104"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe the issue..."
          required
        />

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default App;
