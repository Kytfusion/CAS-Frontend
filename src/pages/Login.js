import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        setIsEmailValid(isValid);
        return isValid;
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const isValid = passwordRegex.test(value);
        setIsPasswordValid(isValid);
        return isValid;
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid) {
            console.log('Login Data:', {email, password});
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
            <div className="text-center w-100" style={{maxWidth: '400px'}}>
                <h2 className="text-dark mb-3 fs-2">
                    Welcome Back
                </h2>
                <p className="text-dark">Please enter your credentials to log in.</p>
                <Form className="mt-3" onSubmit={handleSignIn}>
                    <InputGroup
                        className="mb-3 bg-light rounded"
                        style={{
                            borderBottom: isEmailValid === false ? '2px solid red' : isEmailValid === true ? '2px solid green' : 'none',
                        }}
                    >
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaEnvelope className="text-secondary"/>
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
                        className="mb-3 bg-light rounded"
                        style={{
                            borderBottom: isPasswordValid === false ? '2px solid red' : isPasswordValid === true ? '2px solid green' : 'none',
                        }}
                    >
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaLock className="text-secondary"/>
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
                            style={{cursor: 'pointer'}}
                        >
                            {showPassword ? <FaEyeSlash className="text-secondary"/> : <FaEye className="text-secondary"/>}
                        </InputGroup.Text>
                    </InputGroup>
                    <div className="text-end mt-2 w-100">
                        <Link to="/reset-password" className="text-dark text-decoration-none">Reset: Password</Link>
                    </div>
                    <Button
                        type="submit"
                        className="w-100 mt-3 bg-dark text-white border-0 rounded py-2"
                        disabled={!isEmailValid || !isPasswordValid}
                    >
                        Sign In
                    </Button>
                    <p className="text-start mt-3 w-100">
                        Don't have an account? <Link to="/register" className="text-dark text-decoration-none">Sign Up</Link>
                    </p>
                </Form>
            </div>
        </Container>
    );
}

export default Login; 