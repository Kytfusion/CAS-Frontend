import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

function Home() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="text-center w-100 border-0 shadow-sm" style={{ maxWidth: '700px' }}>
                <Card.Body className="p-4">
                    <Card.Title as="h2" className="text-dark mb-3 fw-bold">
                        Bine ai venit!
                    </Card.Title>
                    <Card.Text className="text-muted mb-5 mx-auto" style={{ maxWidth: '500px' }}>
                        Alătură-te comunității noastre pentru a descoperi noi oportunități și a te conecta cu ceilalți.
                        Alege o opțiune de mai jos pentru a începe aventura!
                    </Card.Text>
                    <div className="d-flex flex-column align-items-center gap-3">
                        <Button
                            as={Link}
                            to="/login"
                            variant="dark"
                            className="w-50 px-5 py-2 rounded-pill text-uppercase fw-medium"
                        >
                            Login
                        </Button>
                        <Button
                            as={Link}
                            to="/register"
                            variant="dark"
                            className="w-50 px-5 py-2 rounded-pill text-uppercase fw-medium"
                        >
                            Register
                        </Button>
                        <Button
                            href="https://mail.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="danger"
                            className="w-50 px-4 py-2 rounded-pill text-uppercase fw-medium d-flex align-items-center justify-content-center gap-2 mt-4"
                        >
                            <FaGoogle /> Gmail
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Home;
