import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect, useRef} from 'react';
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
            <div className="text-center w-100" style={{maxWidth: '400px'}}>
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [showText, setShowText] = useState(false);
    const [step, setStep] = useState(0); // Pasul 0 = formular inițial, 1-5 = pașii de completare a biografiei
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isCodeValid, setIsCodeValid] = useState(null);
    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);
    const inputRefs = useRef([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState(null);

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

    const validateConfirmPassword = (value) => {
        const isValid = value === password;
        setIsConfirmPasswordValid(isValid);
        if (!isValid && value) {
            displayNotification('Passwords do not match.');
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

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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

    const handleResendCode = () => {
        console.log('Resending code to:', email);
        displayNotification(`Verification code resent to ${email}`);
        setTimer(60);
        setShowResendButton(false);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid && isConfirmPasswordValid && agreePrivacy) {
            console.log('Registration Data:', {email, password});
            displayNotification(`Verification code sent to ${email}`);
            setStep(1);
            setTimer(60);
            setShowResendButton(false);
        } else if (!agreePrivacy) {
            displayNotification('Please agree to the Privacy Policy.');
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (isCodeValid) {
                console.log('Code verified:', code.join(''));
                displayNotification('Code verified successfully!');
                setStep(2);
            } else if (code.some((digit) => digit !== '')) {
                displayNotification('Invalid code. Please try again.');
            } else {
                displayNotification('Please enter the verification code.');
            }
        } else if (step === 2) {
            if (firstName && lastName) {
                console.log('Name entered:', {firstName, lastName});
                setStep(3);
            } else {
                displayNotification('Please enter your first and last name.');
            }
        } else if (step === 3) {
            if (birthDate) {
                console.log('Birth date entered:', birthDate);
                setStep(4);
            } else {
                displayNotification('Please select your birth date.');
            }
        } else if (step === 4) {
            if (gender) {
                console.log('Gender selected:', gender);
                setStep(5);
            } else {
                displayNotification('Please select your gender.');
            }
        } else if (step === 5) {
            if (profileImage) {
                console.log('Profile image selected:', profileImage.name);
                displayNotification('Profile setup completed!');
            } else {
                displayNotification('Please select a profile image.');
            }
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
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

    useEffect(() => {
        if (step === 1 && timer > 0 && !showResendButton) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setShowResendButton(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer, showResendButton]);

    const getStepInstruction = () => {
        switch (step) {
            case 0:
                return 'Please create a new account here.';
            case 1:
                return 'Please enter the verification code sent to your email.';
            case 2:
                return 'Please enter your first and last name.';
            case 3:
                return 'Please select your birth date.';
            case 4:
                return 'Please select your gender.';
            case 5:
                return 'Please upload your profile image.';
            default:
                return 'Please follow the instructions to complete your registration.';
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{maxWidth: '400px'}}>
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
                    Create an Account
                </h2>
                <p className="text-dark mb-4">{getStepInstruction()}</p>

                {step > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-4 position-relative"
                         style={{width: '100%'}}>
                        <div className="position-absolute" style={{
                            top: '50%',
                            left: '16px',
                            right: '16px',
                            height: '2px',
                            backgroundColor: '#6c757d',
                            zIndex: 0
                        }}></div>
                        <div
                            className="position-absolute"
                            style={{
                                top: '50%',
                                left: `${16 + (step - 1) * (100 / 5)}px`,
                                width: `${(step - 1) * (100 / 5)}px`,
                                height: '2px',
                                backgroundColor: '#28a745',
                                zIndex: 1,
                                transition: 'width 0.3s ease, left 0.3s ease',
                            }}
                        ></div>
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
                                zIndex: 2,
                            }}
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
                                zIndex: 2,
                            }}
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
                                zIndex: 2,
                            }}
                        >
                            3
                        </div>
                        <div
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: step >= 4 ? '#28a745' : '#6c757d',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                zIndex: 2,
                            }}
                        >
                            4
                        </div>
                        <div
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: step >= 5 ? '#28a745' : '#6c757d',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                zIndex: 2,
                            }}
                        >
                            5
                        </div>
                    </div>
                )}

                {step > 0 && (
                    <div className="d-flex justify-content-between mb-3" style={{width: '100%'}}>
                        <span className="text-dark">Code</span>
                        <span className="text-dark">Name</span>
                        <span className="text-dark">Birth</span>
                        <span className="text-dark">Gender</span>
                        <span className="text-dark">Image</span>
                    </div>
                )}

                <Form className="mt-3" onSubmit={step === 0 ? handleRegister : handleNext}>
                    {step === 0 ? (
                        <>
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
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: '#f1f3f5',
                                    borderRadius: '5px',
                                    borderBottom: isConfirmPasswordValid === false ? '2px solid red' : isConfirmPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color="#6c757d"/>
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
                                    style={{cursor: 'pointer'}}
                                >
                                    {showConfirmPassword ? <FaEyeSlash color="#6c757d"/> : <FaEye color="#6c757d"/>}
                                </InputGroup.Text>
                            </InputGroup>
                            <div className="mb-3 text-start">
                                <Form.Check
                                    type="checkbox"
                                    id="privacyPolicy"
                                    checked={agreePrivacy}
                                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                                    label={
                                        <>
                                            I agree to the{' '}
                                            <Link to="/privacy-policy" className="text-dark">
                                                Privacy Policy
                                            </Link>
                                        </>
                                    }
                                />
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
                                disabled={!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !agreePrivacy}
                            >
                                Create Account
                            </Button>
                        </>
                    ) : step === 1 ? (
                        <>
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
                            <div className="mb-3 text-start">
                                {showResendButton ? (
                                    <Button
                                        variant="link"
                                        className="text-dark p-0"
                                        onClick={handleResendCode}
                                    >
                                        Resend Code
                                    </Button>
                                ) : (
                                    <p className="text-dark">
                                        Resend code available in {timer} seconds
                                    </p>
                                )}
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
                                disabled={code.some((digit) => digit === '') || !isCodeValid}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 2 ? (
                        <>
                            <InputGroup className="mb-3" style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    className="bg-transparent border-0 text-dark"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    className="bg-transparent border-0 text-dark"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </InputGroup>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: '#212529',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px',
                                }}
                                disabled={!firstName || !lastName}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 3 ? (
                        <>
                            <InputGroup className="mb-3" style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}>
                                <Form.Control
                                    type="date"
                                    className="bg-transparent border-0 text-dark"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </InputGroup>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: '#212529',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px',
                                }}
                                disabled={!birthDate}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 4 ? (
                        <>
                            <Form.Select
                                className="mb-3"
                                style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Bărbat</option>
                                <option value="Female">Femeie</option>
                            </Form.Select>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: '#212529',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px',
                                }}
                                disabled={!gender}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 5 ? (
                        <>
                            <InputGroup className="mb-3" style={{backgroundColor: '#f1f3f5', borderRadius: '5px'}}>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    className="bg-transparent border-0 text-dark"
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                />
                            </InputGroup>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: '#212529',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px',
                                }}
                                disabled={!profileImage}
                            >
                                Complete Registration
                            </Button>
                        </>
                    ) : null}

                    <div className="d-flex justify-content-between mt-3" style={{width: '100%'}}>
                        {step > 0 && (
                            <div className="text-start">
                                <span
                                    className="text-dark"
                                    style={{cursor: 'pointer'}}
                                    onClick={handlePreviousStep}
                                >
                                    Back to Previous Step
                                </span>
                            </div>
                        )}
                        <div className="text-end">
                            <Link to="/login" className="text-dark">Back to Login</Link>
                        </div>
                    </div>
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

function PrivacyPolicy() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{maxWidth: '600px'}}>
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
                    Privacy Policy
                </h2>
                <p className="text-dark text-start">
                    <strong>Last Updated:</strong> March 16, 2025
                </p>
                <p className="text-dark text-start">
                    We are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our services.
                </p>
                <h5 className="text-dark text-start mt-4">1. Information We Collect</h5>
                <p className="text-dark text-start">
                    We may collect the following information:
                    <ul>
                        <li>Personal Information: Name, email address, date of birth, gender, and profile image.</li>
                        <li>Account Information: Username, password, and verification codes.</li>
                        <li>Usage Data: Information on how you interact with our services.</li>
                    </ul>
                </p>
                <h5 className="text-dark text-start mt-4">2. How We Use Your Information</h5>
                <p className="text-dark text-start">
                    We use your information to:
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Verify your identity through email verification codes.</li>
                        <li>Personalize your experience by displaying your profile information.</li>
                        <li>Improve our services based on usage data.</li>
                    </ul>
                </p>
                <h5 className="text-dark text-start mt-4">3. Sharing Your Information</h5>
                <p className="text-dark text-start">
                    We do not share your personal information with third parties except:
                    <ul>
                        <li>With your consent.</li>
                        <li>To comply with legal obligations.</li>
                        <li>To protect the security and integrity of our services.</li>
                    </ul>
                </p>
                <h5 className="text-dark text-start mt-4">4. Data Security</h5>
                <p className="text-dark text-start">
                    We implement appropriate technical and organizational measures to protect your data. However, no
                    system is completely secure, and we cannot guarantee absolute security.
                </p>
                <h5 className="text-dark text-start mt-4">5. Your Rights</h5>
                <p className="text-dark text-start">
                    You have the right to:
                    <ul>
                        <li>Access, update, or delete your personal information.</li>
                        <li>Opt-out of receiving promotional communications.</li>
                        <li>Contact us at support@example.com for any privacy concerns.</li>
                    </ul>
                </p>
                <p className="text-dark text-start mt-4">
                    If you have any questions about this Privacy Policy, please contact us at support@example.com.
                </p>
                <div className="text-end mt-4">
                    <Link to="/register" className="text-dark">Back to Register</Link>
                </div>
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
    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);
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
                setTimer(60);
                setShowResendButton(false);
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

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleResendCode = () => {
        console.log('Resending code to:', email);
        displayNotification(`Verification code resent to ${email}`);
        setTimer(60);
        setShowResendButton(false);
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

    useEffect(() => {
        if (step === 2 && timer > 0 && !showResendButton) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setShowResendButton(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer, showResendButton]);

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
            <div className="text-center w-100" style={{maxWidth: '400px'}}>
                <h2 className="text-dark mb-3" style={{fontSize: '2rem'}}>
                    Reset Password
                </h2>
                <p className="text-dark mb-4">{getStepInstruction()}</p>
                <div className="d-flex justify-content-between align-items-center mb-4 position-relative"
                     style={{width: '100%'}}>
                    <div className="position-absolute" style={{
                        top: '50%',
                        left: '16px',
                        right: '16px',
                        height: '2px',
                        backgroundColor: '#6c757d',
                        zIndex: 0
                    }}></div>
                    <div
                        className="position-absolute"
                        style={{
                            top: '50%',
                            left: `${16 + (step - 1) * (100 / 3)}px`,
                            width: `${(step - 1) * (100 / 3)}px`,
                            height: '2px',
                            backgroundColor: '#28a745',
                            zIndex: 1,
                            transition: 'width 0.3s ease, left 0.3s ease',
                        }}
                    ></div>
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
                            zIndex: 2,
                        }}
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
                            zIndex: 2,
                        }}
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
                            zIndex: 2,
                        }}
                    >
                        3
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3" style={{width: '100%'}}>
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
                    ) : step === 2 ? (
                        <>
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
                            <div className="mb-3 text-start">
                                {showResendButton ? (
                                    <Button
                                        variant="link"
                                        className="text-dark p-0"
                                        onClick={handleResendCode}
                                    >
                                        Resend Code
                                    </Button>
                                ) : (
                                    <p className="text-dark">
                                        Resend code available in {timer} seconds
                                    </p>
                                )}
                            </div>
                        </>
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
                                    <FaLock color="#6c757d"/>
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
                                    style={{cursor: 'pointer'}}
                                >
                                    {showNewPassword ? <FaEyeSlash color="#6c757d"/> : <FaEye color="#6c757d"/>}
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
                                    <FaLock color="#6c757d"/>
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
                                    style={{cursor: 'pointer'}}
                                >
                                    {showConfirmPassword ? <FaEyeSlash color="#6c757d"/> : <FaEye color="#6c757d"/>}
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
                <div className="d-flex justify-content-between mt-3" style={{width: '100%'}}>
                    <div className="text-start">
                        {step > 1 && (
                            <span
                                className="text-dark"
                                style={{cursor: 'pointer'}}
                                onClick={handlePreviousStep}
                            >
                                Back to Previous Step
                            </span>
                        )}
                    </div>
                    <div className="text-end">
                        <Link to="/login" className="text-dark">Back to Login</Link>
                    </div>
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
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
