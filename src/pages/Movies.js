import { useState, useEffect, useContext } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import UserContext from '../context/UserContext';

export default function Movies() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://movieapp-api-lms1.onrender.com/movies')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      setMovies(data.movies);
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
    });
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Movie Catalog</h1>
      <Row>
        {movies.map(movie => (
          <Col md={4} key={movie._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Director:</strong> {movie.director}<br />
                  <strong>Year:</strong> {movie.year}<br />
                  <strong>Genre:</strong> {movie.genre}<br />
                  <strong>Description:</strong> {movie.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
