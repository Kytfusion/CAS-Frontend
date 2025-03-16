import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Container, Form, InputGroup} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
                    Welcome Back
                </h2>
                <p className="text-dark">Please enter your credentials to log in.</p>
                <Form className="mt-3">
                    <InputGroup className="mb-3" style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}>
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaEnvelope color="#6c757d"/>
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            className="bg-transparent border-0 text-dark"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}>
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaLock color="#6c757d"/>
                        </InputGroup.Text>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="bg-transparent border-0 text-dark"
                        />
                        <InputGroup.Text
                            className="bg-transparent border-0"
                            onClick={togglePasswordVisibility}
                            style={{cursor: 'pointer'}}
                        >
                            {showPassword ? <FaEyeSlash color="#6c757d"/> : <FaEye color="#6c757d"/>}
                        </InputGroup.Text>
                    </InputGroup>
                </Form>
                <div className="text-end mt-2" style={{width: '100%'}}>
                    <Link to="/reset-password" className="text-dark">Reset: Password</Link>
                </div>
                <p className="text-start mt-3" style={{width: '100%'}}>
                    Don't have an account? <Link to="/register" className="text-dark">Sign Up</Link>
                </p>
            </div>
        </Container>
    );
}

function Register() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
                    Create an Account
                </h2>
                <p className="text-dark">Please create a new account here.</p>
                <p className="text-start mt-3" style={{width: '100%'}}>
                    Already have an account? <Link to="/login" className="text-dark">Sign In</Link>
                </p>
            </div>
        </Container>
    );
}

function ResetPassword() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
                    Reset Password
                </h2>
                <p className="text-dark">Please follow the instructions to reset your password.</p>
                <div className="text-end mt-3" style={{width: '100%'}}>
                    <Link to="/login" className="text-dark">Back to Login</Link>
                </div>
            </div>
        </Container>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
