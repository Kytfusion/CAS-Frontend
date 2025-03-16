import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function Login() {
    return (
        <Container className="text-center mt-5">
            <p>Enter your credentials to log in.</p>
            <Button variant="primary" as={Link} to="/register" className="mt-3">
                Go to Register
            </Button>
        </Container>
    );
}

function Register() {
    return (
        <Container className="text-center mt-5">
            <p>Create a new account here.</p>
            <Button variant="primary" as={Link} to="/login" className="mt-3">
                Go to Login
            </Button>
        </Container>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
