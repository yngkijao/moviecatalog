import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import './Home.css';

export default function Home() {
  const hottestMovies = [
    { title: 'Hot Movie', img: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p14680683_v_h8_aa.jpg' },
    { title: 'Hot Movie', img: 'https://i.ytimg.com/vi/ILqUYvaoqnU/maxresdefault.jpg' },
    { title: 'Hot Movie', img: 'https://i.ytimg.com/vi/vq-DeuzNYTc/hqdefault.jpg' },
  ];

  const otherMovies = [
    { title: 'Mr. Beans Holiday', img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSd115d0j29G22PHbjWty8Apy1BQgn1-_6C1eTMOyClW7p2SiuCJZbFe1og_IJnCBMpJU_N08utpnfWjUkekBUFXi1cKIFn-XZyQBXr5A', description: 'Comedy' },
    { title: 'Bean', img: 'https://i.ytimg.com/vi/ytTIGnp_j_w/maxresdefault.jpg', description: 'Comedy' },
    { title: 'The hills have eyes (2004)', img: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/19BD040166FD36CF908E849612302BADE7597BFEB01C256561CB4FE2E51673E1/scale?width=1200&aspectRatio=1.78&format=webp', description: 'Thrill Horror' },
    { title: 'Underworld', img: 'https://s1.dmcdn.net/v/VTv7U1bSOohJV4a8u/x1080', description: 'Action Horror' },
    { title: 'Van Helsing', img: 'https://www.axn-asia.com/sites/axn-asia.com/files/ct_movie_f_primary_image/van_helsing_-_keyart.jpg', description: 'Action Horror' },
    { title: 'Hell Boy', img: 'https://images5.alphacoders.com/112/thumb-1920-1121254.jpg', description: 'Action' },
  ];

  return (
    <div className="overlay">
      <Container className="mt-5">
        <Carousel className="mb-4 carousel-medium shadow-lg">
          {hottestMovies.map((movie, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={movie.img} alt={movie.title} />
              <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
                <h3>{movie.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <h2 className="text-center mb-4 movie-section-title">Other Movies</h2>
        <Row>
          {otherMovies.map((movie, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="custom-card shadow-sm movie-card">
                <Card.Img variant="top" src={movie.img} className="custom-card-img" />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
