import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner} from 'react-icons/fa';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [showText, setShowText] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        setIsEmailValid(isValid);
        if (!isValid && value) {
            displayNotification('Invalid email address. Please include "@" and a valid domain (e.g., .com).');
        }
        return isValid;
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const isValid = passwordRegex.test(value);
        setIsPasswordValid(isValid);
        if (!isValid && value) {
            displayNotification('Password: 6+ chars, 1 letter, 1 number');
        }
        return isValid;
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid) {
            console.log('Login Data:', {email, password});
            displayNotification(`Logged in with: ${email}, ${password}`);
        }
    };

    const displayNotification = (message) => {
        if (showModal) {
            setShowModal(false);
            setShowText(false);
            setTimeout(() => {
                setCurrentMessage(message);
                setShowModal(true);
            }, 500);
        } else {
            setCurrentMessage(message);
            setShowModal(true);
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

    useEffect(() => {
        if (showModal) {
            const textTimer = setTimeout(() => {
                setShowText(true);
            }, 1000);

            const closeTimer = setTimeout(() => {
                setShowText(false);
                setTimeout(() => {
                    setShowModal(false);
                    setCurrentMessage('');
                }, 500);
            }, 3000);

            return () => {
                clearTimeout(textTimer);
                clearTimeout(closeTimer);
            };
        }
    }, [showModal]);

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center">
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
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
                            <FaEnvelope color="#6c757d"/>
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
                            <FaLock color="#6c757d"/>
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
                            {showPassword ? <FaEyeSlash color="#6c757d"/> : <FaEye color="#6c757d"/>}
                        </InputGroup.Text>
                    </InputGroup>
                    <div className="text-end mt-2" style={{width: '100%'}}>
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
                    <p className="text-start mt-3" style={{width: '100%'}}>
                        Don't have an account? <Link to="/register" className="text-dark">Sign Up</Link>
                    </p>
                </Form>
            </div>

            {showModal && (
                <div
                    className="position-fixed"
                    style={{
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#212529',
                        color: '#fff',
                        padding: '0 20px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                        animation: 'openDynamicIsland 1s ease-in-out forwards, closeDynamicIsland 1s ease-in-out 3s forwards',
                    }}
                >
                    <FaSpinner
                        style={{
                            position: 'absolute',
                            animation: 'spin 1s linear infinite',
                            opacity: showText ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                    <p
                        style={{
                            margin: 0,
                            fontSize: '14px',
                            opacity: showText ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '260px', // Limităm lățimea pentru a preveni strângerea textului
                        }}
                    >
                        {currentMessage}
                    </p>
                </div>
            )}

            <style>
                {`
                    @keyframes openDynamicIsland {
                        0% {
                            transform: translateX(-50%) translateY(-100%);
                            width: 40px;
                            border-radius: 50%;
                            opacity: 0;
                        }
                        50% {
                            transform: translateX(-50%) translateY(0);
                            width: 40px;
                            border-radius: 50%;
                            opacity: 1;
                        }
                        100% {
                            transform: translateX(-50%) translateY(0);
                            width: 300px;
                            border-radius: 20px;
                            opacity: 1;
                        }
                    }
                    @keyframes closeDynamicIsland {
                        0% {
                            transform: translateX(-50%) translateY(0);
                            width: 300px;
                            border-radius: 20px;
                            opacity: 1;
                        }
                        50% {
                            transform: translateX(-50%) translateY(0);
                            width: 40px;
                            border-radius: 50%;
                            opacity: 1;
                        }
                        100% {
                            transform: translateX(-50%) translateY(-100%);
                            width: 40px;
                            border-radius: 50%;
                            opacity: 0;
                        }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
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
