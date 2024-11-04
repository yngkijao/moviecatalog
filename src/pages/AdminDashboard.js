import { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import UserContext from '../context/UserContext';

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    fetch('https://movieapp-api-lms1.onrender.com/movies', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => setMovies(data.movies))
    .catch(error => console.error("Error fetching movies:", error));
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddMovie = (e) => {
    e.preventDefault();
    fetch('https://movieapp-api-lms1.onrender.com/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, director, year, description, genre })
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        setMovies([...movies, data]);
        setShow(false);
        setTitle('');
        setDirector('');
        setYear('');
        setDescription('');
        setGenre('');
      }
    })
    .catch(error => console.error("Error adding movie:", error));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Button variant="primary" onClick={handleShow}>Add Movie</Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td>{movie.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMovie}>
            <Form.Group controlId="movieTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="movieDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter director name"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="movieYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter release year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="movieGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="movieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter movie description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Movie
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
