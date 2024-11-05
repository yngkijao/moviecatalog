import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    setUser({ id: null, isAdmin: null });
    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('https://movieapp-api-lms1.onrender.com/users/details', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          unsetUser();
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        unsetUser();
      });
    } else {
      unsetUser();
    }
  }, []);

  console.log('User state:', user);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={user.id ? <Navigate to="/movies" /> : <Register />} />
            <Route path="/login" element={user.id ? <Navigate to="/movies" /> : <Login />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/admin" element={user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
