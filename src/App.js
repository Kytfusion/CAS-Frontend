import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect, useRef} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaUser, FaVenus, FaMars, FaImage} from 'react-icons/fa';

const styles = {
    colors: {
        primary: '#212529',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        light: '#f1f3f5',
        dark: '#212529',
    },
    fonts: {
        heading: {
            large: '2.5rem',
            medium: '2rem',
            small: '1.1rem'
        },
        text: {
            normal: '1rem',
            small: '0.875rem'
        }
    },
    spacing: {
        section: '2rem',
        element: '1rem',
        small: '0.5rem'
    },
    input: {
        height: '40px',
        borderRadius: '5px',
        padding: '12px'
    },
    container: {
        maxWidth: '400px',
        wide: '600px'
    }
};

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
            <div className="text-center w-100" style={{maxWidth: styles.container.maxWidth}}>
                <h2 className="text-dark mb-3" style={{fontSize: styles.fonts.heading.medium}}>
                    Welcome Back
                </h2>
                <p className="text-dark">Please enter your credentials to log in.</p>
                <Form className="mt-3" onSubmit={handleSignIn}>
                    <InputGroup
                        className="mb-3"
                        style={{
                            backgroundColor: styles.colors.light,
                            borderRadius: styles.input.borderRadius,
                            borderBottom: isEmailValid === false ? '2px solid red' : isEmailValid === true ? '2px solid green' : 'none',
                        }}
                    >
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaEnvelope color={styles.colors.secondary}/>
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
                            backgroundColor: styles.colors.light,
                            borderRadius: styles.input.borderRadius,
                            borderBottom: isPasswordValid === false ? '2px solid red' : isPasswordValid === true ? '2px solid green' : 'none',
                        }}
                    >
                        <InputGroup.Text className="bg-transparent border-0">
                            <FaLock color={styles.colors.secondary}/>
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
                            {showPassword ? <FaEyeSlash color={styles.colors.secondary}/> : <FaEye color={styles.colors.secondary}/>}
                        </InputGroup.Text>
                    </InputGroup>
                    <div className="text-end mt-2" style={{width: '100%'}}>
                        <Link to="/reset-password" className="text-dark">Reset: Password</Link>
                    </div>
                    <Button
                        type="submit"
                        className="w-100 mt-3"
                        style={{
                            backgroundColor: styles.colors.primary,
                            border: 'none',
                            borderRadius: styles.input.borderRadius,
                            padding: styles.input.padding,
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
    const [step, setStep] = useState(0);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isCodeValid, setIsCodeValid] = useState(null);
    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);
    const inputRefs = useRef([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(null);
    const [isLastNameValid, setIsLastNameValid] = useState(null);
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const fileInputRef = useRef(null);

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

    const validateConfirmPassword = (value) => {
        const isValid = value === password;
        setIsConfirmPasswordValid(isValid);
        return isValid;
    };

    const validateCode = (codeArray) => {
        const isValid = codeArray.every((digit) => /^\d$/.test(digit));
        setIsCodeValid(isValid);
        return isValid;
    };

    const validateFirstName = (value) => {
        const nameRegex = /^[A-Za-z]+$/;
        const isValid = nameRegex.test(value) && value.length >= 2;
        setIsFirstNameValid(isValid);
        return isValid;
    };

    const validateLastName = (value) => {
        const nameRegex = /^[A-Za-z]+$/;
        const isValid = nameRegex.test(value) && value.length >= 2;
        setIsLastNameValid(isValid);
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
        setTimer(60);
        setShowResendButton(false);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageContainerClick = () => {
        fileInputRef.current.click();
    };

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        validateFirstName(value);
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        validateLastName(value);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid && isConfirmPasswordValid && agreePrivacy) {
            console.log('Registration Data:', {email, password});
            setStep(1);
            setTimer(60);
            setShowResendButton(false);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (isCodeValid) {
                console.log('Code verified:', code.join(''));
                setStep(2);
            }
        } else if (step === 2) {
            if (isFirstNameValid && isLastNameValid) {
                console.log('Name entered:', {firstName, lastName});
                setStep(3);
            }
        } else if (step === 3) {
            if (birthDate) {
                console.log('Birth date entered:', birthDate);
                setStep(4);
            }
        } else if (step === 4) {
            if (gender) {
                console.log('Gender selected:', gender);
                setStep(5);
            }
        } else if (step === 5) {
            if (profileImage) {
                console.log('Profile image selected:', profileImage.name);
            }
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

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
            <div className="text-center w-100" style={{maxWidth: styles.container.maxWidth}}>
                <h2 className="text-dark mb-3" style={{fontSize: styles.fonts.heading.medium}}>
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
                            backgroundColor: styles.colors.secondary,
                            zIndex: 0
                        }}></div>
                        <div
                            className="position-absolute"
                            style={{
                                top: '50%',
                                left: `${16 + (step - 1) * (100 / 5)}px`,
                                width: `${(step - 1) * (100 / 5)}px`,
                                height: '2px',
                                backgroundColor: styles.colors.success,
                                zIndex: 1,
                                transition: 'width 0.3s ease, left 0.3s ease',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: step >= 1 ? styles.colors.success : styles.colors.secondary,
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
                                backgroundColor: step >= 2 ? styles.colors.success : styles.colors.secondary,
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
                                backgroundColor: step >= 3 ? styles.colors.success : styles.colors.secondary,
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
                                backgroundColor: step >= 4 ? styles.colors.success : styles.colors.secondary,
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
                                backgroundColor: step >= 5 ? styles.colors.success : styles.colors.secondary,
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
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isEmailValid === false ? '2px solid red' : isEmailValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaEnvelope color={styles.colors.secondary}/>
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
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isPasswordValid === false ? '2px solid red' : isPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color={styles.colors.secondary}/>
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
                                    {showPassword ? <FaEyeSlash color={styles.colors.secondary}/> : <FaEye color={styles.colors.secondary}/>}
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isConfirmPasswordValid === false ? '2px solid red' : isConfirmPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color={styles.colors.secondary}/>
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
                                    {showConfirmPassword ? <FaEyeSlash color={styles.colors.secondary}/> : <FaEye color={styles.colors.secondary}/>}
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
                                    backgroundColor: styles.colors.primary,
                                    border: 'none',
                                    borderRadius: styles.input.borderRadius,
                                    padding: styles.input.padding,
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
                                            backgroundColor: styles.colors.light,
                                            borderRadius: styles.input.borderRadius,
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
                                    backgroundColor: styles.colors.primary,
                                    border: 'none',
                                    borderRadius: styles.input.borderRadius,
                                    padding: styles.input.padding,
                                }}
                                disabled={code.some((digit) => digit === '') || !isCodeValid}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 2 ? (
                        <>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isFirstNameValid === false ? '2px solid red' : isFirstNameValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaUser color={styles.colors.secondary}/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    className="bg-transparent border-0 text-dark"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </InputGroup>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isLastNameValid === false ? '2px solid red' : isLastNameValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaUser color={styles.colors.secondary}/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    className="bg-transparent border-0 text-dark"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </InputGroup>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: styles.colors.primary,
                                    border: 'none',
                                    borderRadius: styles.input.borderRadius,
                                    padding: styles.input.padding,
                                }}
                                disabled={!isFirstNameValid || !isLastNameValid}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 3 ? (
                        <>
                            <InputGroup className="mb-3" style={{backgroundColor: styles.colors.light, borderRadius: styles.input.borderRadius}}>
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
                                    backgroundColor: styles.colors.primary,
                                    border: 'none',
                                    borderRadius: styles.input.borderRadius,
                                    padding: styles.input.padding,
                                }}
                                disabled={!birthDate}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 4 ? (
                        <>
                            <div
                                className="mb-3 d-flex align-items-center p-2"
                                style={{
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    border: gender === 'Female' ? '2px solid green' : 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setGender('Female')}
                            >
                                <FaVenus color={styles.colors.secondary} className="me-2"/>
                                <span className="text-dark">Femeie</span>
                            </div>
                            <div
                                className="mb-3 d-flex align-items-center p-2"
                                style={{
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    border: gender === 'Male' ? '2px solid green' : 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setGender('Male')}
                            >
                                <FaMars color={styles.colors.secondary} className="me-2"/>
                                <span className="text-dark">Bărbat</span>
                            </div>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: styles.colors.primary,
                                    border: 'none',
                                    borderRadius: styles.input.borderRadius,
                                    padding: styles.input.padding,
                                }}
                                disabled={!gender}
                            >
                                Next
                            </Button>
                        </>
                    ) : step === 5 ? (
                        <>
                            <div
                                className="mb-3 d-flex justify-content-center align-items-center"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    cursor: 'pointer',
                                    margin: '0 auto',
                                    overflow: 'hidden',
                                }}
                                onClick={handleImageContainerClick}
                            >
                                {profileImagePreview ? (
                                    <img
                                        src={profileImagePreview}
                                        alt="Profile Preview"
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                ) : (
                                    <FaImage color={styles.colors.secondary} size={50}/>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                ref={fileInputRef}
                                onChange={handleImageSelect}
                            />
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                style={{
                                    backgroundColor: styles.colors.primary,
                                    border: 'none',
                                    borderRadius: styles.input.borderRadius,
                                    padding: styles.input.padding,
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
                    </div>
                </Form>
            </div>
        </Container>
    );
}

function PrivacyPolicy() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{maxWidth: styles.container.wide}}>
                <h2 className="text-dark mb-3" style={{fontSize: styles.fonts.heading.medium}}>
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
        return isValid;
    };

    const validateCode = (codeArray) => {
        const isValid = codeArray.every((digit) => /^\d$/.test(digit));
        setIsCodeValid(isValid);
        return isValid;
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const isValid = passwordRegex.test(value);
        setIsNewPasswordValid(isValid);
        return isValid;
    };

    const validateConfirmPassword = (value) => {
        const isValid = value === newPassword;
        setIsConfirmPasswordValid(isValid);
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
                setStep(2);
                setTimer(60);
                setShowResendButton(false);
            }
        } else if (step === 2) {
            if (isCodeValid) {
                console.log('Code verified:', code.join(''));
                setStep(3);
            }
        } else if (step === 3) {
            if (isNewPasswordValid && isConfirmPasswordValid) {
                console.log('Password reset successfully, New Password:', newPassword);
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
        setTimer(60);
        setShowResendButton(false);
    };

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
            <div className="text-center w-100" style={{maxWidth: styles.container.maxWidth}}>
                <h2 className="text-dark mb-3" style={{fontSize: styles.fonts.heading.medium}}>
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
                        backgroundColor: styles.colors.secondary,
                        zIndex: 0
                    }}></div>
                    <div
                        className="position-absolute"
                        style={{
                            top: '50%',
                            left: `${16 + (step - 1) * (100 / 3)}px`,
                            width: `${(step - 1) * (100 / 3)}px`,
                            height: '2px',
                            backgroundColor: styles.colors.success,
                            zIndex: 1,
                            transition: 'width 0.3s ease, left 0.3s ease',
                        }}
                    ></div>
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: step >= 1 ? styles.colors.success : styles.colors.secondary,
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
                            backgroundColor: step >= 2 ? styles.colors.success : styles.colors.secondary,
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
                            backgroundColor: step >= 3 ? styles.colors.success : styles.colors.secondary,
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
                                backgroundColor: styles.colors.light,
                                borderRadius: styles.input.borderRadius,
                                borderBottom: isEmailValid === false ? '2px solid red' : isEmailValid === true ? '2px solid green' : 'none',
                            }}
                        >
                            <InputGroup.Text className="bg-transparent border-0">
                                <FaEnvelope color={styles.colors.secondary}/>
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
                                            backgroundColor: styles.colors.light,
                                            borderRadius: styles.input.borderRadius,
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
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isNewPasswordValid === false ? '2px solid red' : isNewPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color={styles.colors.secondary}/>
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
                                    {showNewPassword ? <FaEyeSlash color={styles.colors.secondary}/> : <FaEye color={styles.colors.secondary}/>}
                                </InputGroup.Text>
                            </InputGroup>
                            <InputGroup
                                className="mb-3"
                                style={{
                                    backgroundColor: styles.colors.light,
                                    borderRadius: styles.input.borderRadius,
                                    borderBottom: isConfirmPasswordValid === false ? '2px solid red' : isConfirmPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock color={styles.colors.secondary}/>
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
                                    {showConfirmPassword ? <FaEyeSlash color={styles.colors.secondary}/> : <FaEye color={styles.colors.secondary}/>}
                                </InputGroup.Text>
                            </InputGroup>
                        </>
                    )}
                    <Button
                        type="submit"
                        className="w-100 mt-3"
                        style={{
                            backgroundColor: styles.colors.primary,
                            border: 'none',
                            borderRadius: styles.input.borderRadius,
                            padding: styles.input.padding,
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
                    {step > 1 && (
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
                </div>
            </div>
        </Container>
    );
}

function Home() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{maxWidth: styles.container.maxWidth}}>
                <h1 className="text-dark mb-2" style={{fontSize: styles.fonts.heading.large, fontWeight: 'bold'}}>
                    Welcome to CAS
                </h1>
                <p className="text-dark mb-4" style={{fontSize: styles.fonts.heading.small}}>
                    Your secure authentication solution
                </p>
                <div className="d-flex flex-column gap-3">
                    <Button
                        as={Link}
                        to="/login"
                        className="w-100"
                        style={{
                            backgroundColor: styles.colors.primary,
                            border: 'none',
                            borderRadius: styles.input.borderRadius,
                            padding: styles.input.padding,
                            fontSize: styles.fonts.heading.small
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        as={Link}
                        to="/register"
                        className="w-100"
                        style={{
                            backgroundColor: styles.colors.light,
                            border: 'none',
                            borderRadius: styles.input.borderRadius,
                            padding: styles.input.padding,
                            color: styles.colors.dark,
                            fontSize: styles.fonts.heading.small
                        }}
                    >
                        Register
                    </Button>
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
                    <Route path="/" element={<Home/>}/>
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