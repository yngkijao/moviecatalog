import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import './Register.css'; // Make sure to import the CSS file

export default function Register() {
  const notyf = new Notyf();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      notyf.error("Passwords do not match");
      return;
    }
    fetch('https://movieapp-api-lms1.onrender.com/users/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Registered Successfully") {
        notyf.success("Registration Successful");
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        notyf.error("Registration Failed");
      }
    })
    .catch(error => {
      console.error("Error during registration:", error);
      notyf.error("Registration Failed");
    });
  }

  useEffect(() => {
    if (email !== '' && password !== '' && confirmPassword !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, confirmPassword]);

  return (
    (user.id !== null) ? <Navigate to="/movies" /> :
      <Container className="register-container">
        <h1 className="my-5 text-center">Register</h1>
        <Form onSubmit={registerUser}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="short-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="short-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="short-input"
            />
          </Form.Group>
          {isActive ? 
            <Button variant="primary" type="submit">Submit</Button> 
            : 
            <Button variant="primary" disabled>Submit</Button>
          }
        </Form>
      </Container>
  );
}
