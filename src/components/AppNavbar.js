import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './AppNavbar.css';

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

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
          setUser({ id: null, isAdmin: null });
          localStorage.clear();
        }
      })
      .catch(() => {
        setUser({ id: null, isAdmin: null });
        localStorage.clear();
      });
    } else {
      setUser({ id: null, isAdmin: null });
      localStorage.clear();
    }
  }, [setUser]);

  return (
    <Navbar expand="lg" className="pastel-navbar">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">Movie Catalog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/movies" exact="true">Movies</Nav.Link>
            {user.id ? (
              <>
                {user.isAdmin && <Nav.Link as={NavLink} to="/admin" exact="true">Admin Dashboard</Nav.Link>}
                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
