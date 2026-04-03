import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing     from './pages/Landing';      // Municipal landing
import Login       from './pages/Login';        // Municipal login
import Dashboard   from './pages/Dashboard';    // Municipal dashboard
import UploadImage from './pages/UploadImage';  // Citizen upload

function App() {
  return (
    <Router>
      <Routes>
        {/* Citizen uploads */}
        <Route path="/upload" element={<UploadImage />} />

        {/* Municipal flows */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;



// Citizen Upload	http://localhost:3000/upload	Upload images (no login required)
// Municipal Login	http://localhost:3000/admin	Login as admin
// Dashboard	http://localhost:3000/admin/dashboard	Admin dashboard (only after login)
