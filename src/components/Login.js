import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NotificationContext } from '../App';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);

    const { showNotification } = useContext(NotificationContext); // Use the context

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        setIsEmailValid(isValid);
        if (!isValid && value) {
            showNotification('Invalid email address. Please include "@" and a valid domain (e.g., .com).');
        }
        return isValid;
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const isValid = passwordRegex.test(value);
        setIsPasswordValid(isValid);
        if (!isValid && value) {
            showNotification('Password: 6+ chars, 1 letter, 1 number');
        }
        return isValid;
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid) {
            console.log('Login Data:', { email, password });
            showNotification(`Logged in with: ${email}, ${password}`);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-dark mb-3" style={{ fontSize: '2rem' }}>
                    Welcome Back
                </h2>
                <p className="text-dark">Please enter your credentials to log in.</p>
                <Form className="mt-3" onSubmit={handleSignIn}>
                    <InputGroup
                        className="mb-3"
                        style={{
                            backgroundColor: '#f1f3f5',
                            borderRadius: '5px',
                            borderBottom: isEmailValid === false ? '2px solid red' : isEmailValid === true ? '2px solid green' : 'none',
                        }}
                    >
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaEnvelope color="#6c757d" />
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            className="bg-transparent border-0 text-dark"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </InputGroup>
                    <InputGroup
                        className="mb-3"
                        style={{
                            backgroundColor: '#f1f3f5',
                            borderRadius: '5px',
                            borderBottom: isPasswordValid === false ? '2px solid red' : isPasswordValid === true ? '2px solid green' : 'none',
                        }}
                    >
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaLock color="#6c757d" />
                        </InputGroup.Text>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="bg-transparent border-0 text-dark"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <InputGroup.Text
                            className="bg-transparent border-0"
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        >
                            {showPassword ? <FaEyeSlash color="#6c757d" /> : <FaEye color="#6c757d" />}
                        </InputGroup.Text>
                    </InputGroup>
                    <div className="text-end mt-2" style={{ width: '100%' }}>
                        <Link to="/reset-password" className="text-dark">Reset: Password</Link>
                    </div>
                    <Button
                        type="submit"
                        className="w-100 mt-3"
                        style={{
                            backgroundColor: '#212529',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                        disabled={!isEmailValid || !isPasswordValid}
                    >
                        Sign In
                    </Button>
                    <p className="text-start mt-3" style={{ width: '100%' }}>
                        Don't have an account? <Link to="/register" className="text-dark">Sign Up</Link>
                    </p>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
