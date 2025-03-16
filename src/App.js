import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h2 className="text-dark mb-3" style={{ fontSize: '2rem' }}>
                    Welcome Back
                </h2>
                <p className="text-dark">Please enter your credentials to log in.</p>
                <p className="text-dark mt-3">Don't have an account? <Link to="/register" className="text-dark">Sign Up</Link></p>
            </div>
        </Container>
    );
}

function Register() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h2 className="text-dark mb-3" style={{ fontSize: '2rem' }}>
                    Create an Account
                </h2>
                <p className="text-dark">Please create a new account here.</p>
                <p className="text-dark mt-3">Already have an account? <Link to="/login" className="text-dark">Sign In</Link></p>
            </div>
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
