import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('splash');
  const [isRegistered, setIsRegistered] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('complainant');
  const [issues, setIssues] = useState([]);
  const [trackingId, setTrackingId] = useState('');
  const [trackedIssue, setTrackedIssue] = useState(null);

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

  useEffect(() => {
    setTimeout(() => setPage('loading'), 600);
    setTimeout(() => setPage('auth'), 1000);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (username && password) {
      setPage(userType === 'complainant' ? 'complainantMain' : 'resolverMain');
    } else {
      alert('Please enter valid credentials');
    }
  };

  const [submittedIssueId, setSubmittedIssueId] = useState('');

  const generateIssueId = () => {
    return 'RF-' + Math.floor(100000 + Math.random() * 900000);
    
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    const id = generateIssueId();
    const newIssue = {
      id,
      department,
      issue,
      priority,
      location,
      description,
      status: 'Running',
    };
    setIssues([...issues, newIssue]);
    setSubmittedIssueId(id);
    setPage('issueSubmitted');
  
    // Clear form
    setDepartment('');
    setIssue('');
    setPriority('');
    setLocation('');
    setDescription('');
  };
  

  const handleTrack = () => {
    const found = issues.find(i => i.id === trackingId);
    setTrackedIssue(found || null);
  };

  const markAsSolving = (id) => {
    setIssues(issues.map(i => i.id === id ? { ...i, status: 'Solving' } : i));
  };

  const markAsResolved = (id) => {
    setIssues(issues.map(i => i.id === id ? { ...i, status: 'Resolved' } : i));
  };

  const renderHomeButton = () => (
    <button onClick={() => setPage('auth')} style={{
      backgroundColor: '#4e3002', 
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    }}>Home</button>
  );

  if (page === 'splash') {
    return (
      <div className="centered">
        <img src="/logo.png" alt="Logo" style={{ width: '120px' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Rungta Fixit</h1>
      </div>
    );
  }

  if (page === 'loading') {
    return (
      <div className="centered">
        <h2 style={{ fontSize: '1.5rem' }}>Please wait...</h2>
      </div>
    );
  }

  if (page === 'auth') {
    return (
      <div className="centered" style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#333' }}>{isRegistered ? 'Login' : 'Register'} ({userType})</h2>
        <form onSubmit={handleAuth} className="auth-form">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <button type="button" onClick={() => setUserType('complainant')} style={{ backgroundColor: userType === 'complainant' ? '#4e3002' : '#ccc', color: userType === 'complainant' ? 'white' : 'black' }}>Complainant</button>
            <button type="button" onClick={() => setUserType('resolver')} style={{ backgroundColor: userType === 'resolver' ? '#4e3002' : '#ccc', color: userType === 'resolver' ? 'white' : 'black' }}>Resolver</button>
          </div>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">{isRegistered ? 'Login' : 'Register'}</button>
          <p style={{ color:'#4e3002'}} onClick={() => setIsRegistered(!isRegistered)}>{isRegistered ? 'New user? Register here' : 'Already registered? Login'}</p>
        </form>
      </div>
    );
  }

  if (page === 'complainantMain') {
    return (
      <div className="container" >
        {renderHomeButton()}
        <h1>Rungta Fixit - Complainant</h1>
        <form  onSubmit={handleIssueSubmit}>
          <select styles={{  }}  value={department} onChange={e => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
          <select value={issue} onChange={e => setIssue(e.target.value)}>
            <option value="">Select Issue</option>
            {issuesByDept[department]?.map(iss => <option key={iss} value={iss}>{iss}</option>)}
          </select>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">Select Priority</option>
            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit">Submit Issue</button>
        </form>
        <hr style={{ margin: '30px 0' }} />
        <h2>Track Your Issue</h2>
        <input type="text" value={trackingId} onChange={e => setTrackingId(e.target.value)} placeholder="Enter your Issue ID" />
        <button onClick={handleTrack} style={{ backgroundColor: '#4e3002',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px', marginLeft: '10px', marginTop: '10px' }}>Track</button>
        {trackedIssue && (
          <div className="issue-card" style={{ marginTop: '15px' }}>
            <p><strong>ID:</strong> {trackedIssue.id}</p>
            <p><strong>Department:</strong> {trackedIssue.department}</p>
            <p><strong>Issue:</strong> {trackedIssue.issue}</p>
            <p><strong>Priority:</strong> {trackedIssue.priority}</p>
            <p><strong>Location:</strong> {trackedIssue.location}</p>
            <p><strong>Description:</strong> {trackedIssue.description}</p>
            <p><strong>Status:</strong> {trackedIssue.status}</p>
          </div>
        )}
      </div>
    );
  }

  if (page === 'issueSubmitted') {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>Issue Submitted Successfully ✅</h1>
        <p>Your Tracking ID is:</p>
        <h2 style={{ color: '#4e3002' }}>{submittedIssueId}</h2>
        <button
          onClick={() => setPage('complainantMain')}
          style={{ marginTop: '20px', padding: '10px 20px', background: '#4e3002', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Go to Home
        </button>
      </div>
    );
  }
  
  if (page === 'resolverMain') {
    const runningIssues = issues.filter(i => i.status !== 'Resolved');
    const resolvedIssues = issues.filter(i => i.status === 'Resolved');

    const handleStatusChange = (id, newStatus) => {
      setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue));
    };

    return (
      <div className="container">
        {renderHomeButton()}
        <h1>Resolver Dashboard</h1>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 1 }}>
            <h2>Running Issues</h2>
            {runningIssues.length === 0 ? <p>No running issues.</p> : (
              runningIssues.map(issue => (
                <div key={issue.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                  <p><strong>ID:</strong> {issue.id}</p>
                  <p><strong>Issue:</strong> {issue.issue}</p>
                  <p><strong>Location:</strong> {issue.location}</p>
                  <label>Status:</label>
                  <select value={issue.status} onChange={e => handleStatusChange(issue.id, e.target.value)}>
                    <option value="Running">Running</option>
                    <option value="Solving">Solving</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              ))
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h2>Resolved Issues</h2>
            {resolvedIssues.length === 0 ? <p>No resolved issues.</p> : (
              resolvedIssues.map(issue => (
                <div key={issue.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                  <p><strong>ID:</strong> {issue.id}</p>
                  <p><strong>Issue:</strong> {issue.issue}</p>
                  <p><strong>Location:</strong> {issue.location}</p>
                  <label>Status:</label>
                  <select value={issue.status} onChange={e => handleStatusChange(issue.id, e.target.value)}>
                    <option value="Running">Running</option>
                    <option value="Solving">Solving</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
