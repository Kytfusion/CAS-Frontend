import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

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
            console.log('Login Data:', { email, password });
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
                            maxWidth: '260px',
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
                            border-radius: '50%;
                            opacity: 0;
                        }
                        50% {
                            transform: translateX(-50%) translateY(0);
                            width: 40px;
                            border-radius: '50%;
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
                            border-radius: '50%;
                            opacity: 1;
                        }
                        100% {
                            transform: translateX(-50%) translateY(-100%);
                            width: 40px;
                            border-radius: '50%;
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
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-dark mb-3" style={{ fontSize: '2rem' }}>
                    Create an Account
                </h2>
                <p className="text-dark">Please create a new account here.</p>
                <p className="text-start mt-3" style={{ width: '100%' }}>
                    Already have an account? <Link to="/login" className="text-dark">Sign In</Link>
                </p>
            </div>
        </Container>
    );
}

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [showText, setShowText] = useState(false);
    const [step, setStep] = useState(1);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isCodeValid, setIsCodeValid] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(null);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [initialEmail, setInitialEmail] = useState('');
    const [initialCode, setInitialCode] = useState(['', '', '', '', '', '']);
    const [initialNewPassword, setInitialNewPassword] = useState('');
    const [initialConfirmPassword, setInitialConfirmPassword] = useState('');
    const inputRefs = useRef([]);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        setIsEmailValid(isValid);
        if (!isValid && value) {
            displayNotification('Invalid email address. Please include "@" and a valid domain (e.g., .com).');
        }
        return isValid;
    };

    const validateCode = (codeArray) => {
        const isValid = codeArray.every((digit) => /^\d$/.test(digit));
        setIsCodeValid(isValid);
        if (!isValid && codeArray.some((digit) => digit !== '')) {
            displayNotification('Code must contain exactly 6 digits.');
        }
        return isValid;
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const isValid = passwordRegex.test(value);
        setIsNewPasswordValid(isValid);
        if (!isValid && value) {
            displayNotification('Password: 6+ chars, 1 letter, 1 number');
        }
        return isValid;
    };

    const validateConfirmPassword = (value) => {
        const isValid = value === newPassword;
        setIsConfirmPasswordValid(isValid);
        if (!isValid && value) {
            displayNotification('Passwords do not match.');
        }
        return isValid;
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleCodeChange = (index, value) => {
        if (/^\d$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            validateCode(newCode);

            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        validatePassword(value);
        if (confirmPassword) {
            validateConfirmPassword(confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmPassword(value);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (isEmailValid) {
                console.log('Server response: 200, Email:', email);
                displayNotification(`Verification code sent to ${email}`);
                setStep(2);
                setInitialEmail(email);
            } else if (email) {
                console.log('Server response: 400, Invalid email');
                displayNotification('Invalid email address. Please try again.');
            } else {
                displayNotification('Please enter your email address.');
            }
        } else if (step === 2) {
            if (isCodeValid) {
                console.log('Code verified:', code.join(''));
                displayNotification('Code verified successfully!');
                setStep(3);
                setInitialCode([...code]);
            } else if (code.some((digit) => digit !== '')) {
                displayNotification('Invalid code. Please try again.');
            } else {
                displayNotification('Please enter the verification code.');
            }
        } else if (step === 3) {
            if (isNewPasswordValid && isConfirmPasswordValid) {
                console.log('Password reset successfully, New Password:', newPassword);
                displayNotification('Password reset successfully!');
            } else if (!isNewPasswordValid) {
                displayNotification('Password: 6+ chars, 1 letter, 1 number');
            } else if (!isConfirmPasswordValid) {
                displayNotification('Passwords do not match.');
            }
        }
    };

    const handleStepClick = (newStep) => {
        if (newStep < step) {
            const isEmailUnchanged = email === initialEmail;
            const isCodeUnchanged = code.join('') === initialCode.join('');
            const isPasswordUnchanged = newPassword === initialNewPassword && confirmPassword === initialConfirmPassword;

            if (newStep === 1 && isEmailUnchanged) {
                setStep(newStep);
            } else if (newStep === 2 && isCodeUnchanged && step > 2) {
                setStep(newStep);
            } else if (newStep === 3 && isPasswordUnchanged && step > 3) {
                setStep(newStep);
            }
        } else if (newStep > step) {
            // Permite navigarea doar prin "Next"
            if (newStep === 2 && isEmailValid) {
                setStep(newStep);
                setInitialEmail(email);
            } else if (newStep === 3 && isCodeValid) {
                setStep(newStep);
                setInitialCode([...code]);
            }
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

    // Determină subtitlul în funcție de pasul curent
    const getStepInstruction = () => {
        switch (step) {
            case 1:
                return 'Please enter your email to start the password reset process.';
            case 2:
                return 'Please enter the verification code sent to your email.';
            case 3:
                return 'Please set your new password to complete the reset.';
            default:
                return 'Please follow the instructions to reset your password.';
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-dark mb-3" style={{ fontSize: '2rem' }}>
                    Reset Password
                </h2>
                <p className="text-dark mb-4">{getStepInstruction()}</p>
                <div className="d-flex justify-content-between align-items-center mb-4 position-relative" style={{ width: '100%' }}>
                    <div className="position-absolute" style={{ top: '50%', left: '16px', right: '16px', height: '2px', backgroundColor: '#6c757d', zIndex: 0 }}></div>
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: step >= 1 ? '#28a745' : '#6c757d',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            cursor: step > 1 ? 'pointer' : 'default',
                            zIndex: 1,
                        }}
                        onClick={() => handleStepClick(1)}
                    >
                        1
                    </div>
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: step >= 2 ? '#28a745' : '#6c757d',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            cursor: step > 2 ? 'pointer' : 'default',
                            zIndex: 1,
                        }}
                        onClick={() => handleStepClick(2)}
                    >
                        2
                    </div>
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: step >= 3 ? '#28a745' : '#6c757d',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            cursor: 'default',
                            zIndex: 1,
                        }}
                        onClick={() => handleStepClick(3)}
                    >
                        3
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3" style={{ width: '100%' }}>
                    <span className="text-dark">Email</span>
                    <span className="text-dark">Code</span>
                    <span className="text-dark">Password</span>
                </div>
                <Form className="mt-3" onSubmit={handleNext}>
                    {step === 1 ? (
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
                    ) : step === 2 ? (
                        <div className="d-flex justify-content-center gap-2 mb-3">
                            {code.map((digit, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    className="text-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#f1f3f5',
                                        borderRadius: '5px',
                                        border: isCodeValid === false && digit !== '' ? '2px solid red' : isCodeValid === true ? '2px solid green' : 'none',
                                    }}
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    maxLength={1}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: '#f1f3f5',
                                    borderRadius: '5px',
                                    borderBottom: isNewPasswordValid === false ? '2px solid red' : isNewPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color="#6c757d" />
                                </InputGroup.Text>
                                <Form.Control
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="New Password"
                                    className="bg-transparent border-0 text-dark"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                                <InputGroup.Text
                                    className="bg-transparent border-0"
                                    onClick={toggleNewPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showNewPassword ? <FaEyeSlash color="#6c757d" /> : <FaEye color="#6c757d" />}
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: '#f1f3f5',
                                    borderRadius: '5px',
                                    borderBottom: isConfirmPasswordValid === false ? '2px solid red' : isConfirmPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color="#6c757d" />
                                </InputGroup.Text>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    className="bg-transparent border-0 text-dark"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <InputGroup.Text
                                    className="bg-transparent border-0"
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showConfirmPassword ? <FaEyeSlash color="#6c757d" /> : <FaEye color="#6c757d" />}
                                </InputGroup.Text>
                            </InputGroup>
                        </>
                    )}
                    <Button
                        type="submit"
                        className="w-100 mt-3"
                        style={{
                            backgroundColor: '#212529',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                        disabled={
                            (step === 1 && (email.length === 0 || !isEmailValid)) ||
                            (step === 2 && (code.some((digit) => digit === '') || !isCodeValid)) ||
                            (step === 3 && (newPassword.length === 0 || !isNewPasswordValid || confirmPassword.length === 0 || !isConfirmPasswordValid))
                        }
                    >
                        {step === 3 ? 'Reset Password' : 'Next'}
                    </Button>
                </Form>
                <div className="text-end mt-3" style={{ width: '100%' }}>
                    <Link to="/login" className="text-dark">Back to Login</Link>
                </div>
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
                            maxWidth: '260px',
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
                            border-radius: '50%;
                            opacity: 0;
                        }
                        50% {
                            transform: translateX(-50%) translateY(0);
                            width: 40px;
                            border-radius: '50%;
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
                            border-radius: '50%;
                            opacity: 1;
                        }
                        100% {
                            transform: translateX(-50%) translateY(-100%);
                            width: 40px;
                            border-radius: '50%;
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

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
