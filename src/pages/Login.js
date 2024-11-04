import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './Login.css';  // Make sure to import the CSS file

export default function Login() {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (user.id) {
      setShouldRedirect(true);
    }
  }, [user.id]);

  function authenticate(e) {
    e.preventDefault();

    fetch('https://movieapp-api-lms1.onrender.com/users/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.access) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
        notyf.success('Successful Login');
      } else {
        notyf.error('Login Failed');
      }
    })
    .catch(error => {
      console.error("Error during login request:", error);
      notyf.error('Login Failed');
    });
  }

  const retrieveUserDetails = (token) => {
    fetch('https://movieapp-api-lms1.onrender.com/users/details', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
    })
    .catch(error => {
      console.error("Error retrieving user details:", error);
    });
  }

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  if (shouldRedirect) {
    return <Navigate to="/movies" />;
  }

  return (
    <Form onSubmit={authenticate} className="text-center login-container">
      <h1 className="my-5">Login</h1>
      <Form.Group controlId="userEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="short-input"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="short-input"
        />
      </Form.Group>
      {isActive ? 
        <Button variant="primary" type="submit">Submit</Button> 
        : 
        <Button variant="danger" type="submit" disabled>Submit</Button>
      }
      <div className="mt-3">
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
      </div>
    </Form>
  );
}
