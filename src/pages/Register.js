import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaVenus, FaMars, FaImage} from 'react-icons/fa';

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
        validateConfirmPassword(confirmPassword);
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
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        validateCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResendCode = () => {
        setTimer(60);
        setShowResendButton(false);
        // Here you would typically make an API call to resend the code
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
        if (step === 0 && isEmailValid && isPasswordValid && isConfirmPasswordValid && agreePrivacy) {
            setStep(1);
        } else if (step === 1 && isCodeValid) {
            setStep(2);
        } else if (step === 2 && isFirstNameValid && isLastNameValid && birthDate && gender) {
            console.log('Registration Data:', {
                email,
                password,
                firstName,
                lastName,
                birthDate,
                gender,
                profileImage
            });
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 0 && isEmailValid && isPasswordValid && isConfirmPasswordValid && agreePrivacy) {
            setStep(1);
        } else if (step === 1 && isCodeValid) {
            setStep(2);
        }
    };

    const handlePreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const getStepInstruction = () => {
        switch (step) {
            case 0:
                return 'Create your account';
            case 1:
                return 'Enter verification code';
            case 2:
                return 'Complete your profile';
            default:
                return '';
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{maxWidth: '400px'}}>
                <h2 className="text-dark mb-3 fs-2">
                    {getStepInstruction()}
                </h2>
                <Form className="mt-3" onSubmit={handleRegister}>
                    {step === 0 && (
                        <>
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
                            <InputGroup
                                className="mb-3 bg-light rounded"
                                style={{
                                    borderBottom: isConfirmPasswordValid === false ? '2px solid red' : isConfirmPasswordValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaLock className="text-secondary"/>
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
                                    {showConfirmPassword ? <FaEyeSlash className="text-secondary"/> : <FaEye className="text-secondary"/>}
                                </InputGroup.Text>
                            </InputGroup>
                            <Form.Check
                                type="checkbox"
                                id="privacy-check"
                                label={
                                    <span>
                                        I agree to the <Link to="/privacy" className="text-dark text-decoration-none">Privacy Policy</Link>
                                    </span>
                                }
                                checked={agreePrivacy}
                                onChange={(e) => setAgreePrivacy(e.target.checked)}
                                className="mb-3"
                            />
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <div className="d-flex justify-content-center gap-2 mb-3">
                                {code.map((digit, index) => (
                                    <Form.Control
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        className="text-center"
                                        style={{width: '40px', height: '40px'}}
                                    />
                                ))}
                            </div>
                            {!showResendButton ? (
                                <p className="mb-3">Resend code in {timer}s</p>
                            ) : (
                                <Button
                                    variant="link"
                                    onClick={handleResendCode}
                                    className="mb-3"
                                >
                                    Resend Code
                                </Button>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div
                                className="mb-3 bg-light rounded-circle d-flex align-items-center justify-content-center"
                                onClick={handleImageContainerClick}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    margin: '0 auto',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
                                }}
                            >
                                {profileImagePreview ? (
                                    <img
                                        src={profileImagePreview}
                                        alt="Profile"
                                        className="w-100 h-100"
                                        style={{objectFit: 'cover'}}
                                    />
                                ) : (
                                    <FaImage size={30} className="text-secondary"/>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageSelect}
                                accept="image/*"
                                style={{display: 'none'}}
                            />
                            <InputGroup
                                className="mb-3 bg-light rounded"
                                style={{
                                    borderBottom: isFirstNameValid === false ? '2px solid red' : isFirstNameValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaUser className="text-secondary"/>
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
                                className="mb-3 bg-light rounded"
                                style={{
                                    borderBottom: isLastNameValid === false ? '2px solid red' : isLastNameValid === true ? '2px solid green' : 'none',
                                }}
                            >
                                <InputGroup.Text className="bg-transparent border-0">
                                    <FaUser className="text-secondary"/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    className="bg-transparent border-0 text-dark"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </InputGroup>
                            <Form.Control
                                type="date"
                                className="mb-3 bg-light rounded"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            <div className="d-flex gap-3 mb-3">
                                <Button
                                    variant={gender === 'male' ? 'primary' : 'outline-primary'}
                                    onClick={() => setGender('male')}
                                    className="flex-grow-1"
                                >
                                    <FaMars className="me-2"/>
                                    Male
                                </Button>
                                <Button
                                    variant={gender === 'female' ? 'primary' : 'outline-primary'}
                                    onClick={() => setGender('female')}
                                    className="flex-grow-1"
                                >
                                    <FaVenus className="me-2"/>
                                    Female
                                </Button>
                            </div>
                        </>
                    )}

                    <div className="d-flex justify-content-between">
                        {step > 0 && (
                            <Button
                                variant="outline-primary"
                                onClick={handlePreviousStep}
                                className="bg-light border-0 rounded py-2"
                            >
                                Previous
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="flex-grow-1 ms-3 bg-dark text-white border-0 rounded py-2"
                            disabled={
                                (step === 0 && (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !agreePrivacy)) ||
                                (step === 1 && !isCodeValid) ||
                                (step === 2 && (!isFirstNameValid || !isLastNameValid || !birthDate || !gender))
                            }
                        >
                            {step === 2 ? 'Complete Registration' : 'Next'}
                        </Button>
                    </div>
                </Form>
                <p className="text-start mt-3 w-100">
                    Already have an account? <Link to="/login" className="text-dark text-decoration-none">Sign In</Link>
                </p>
            </div>
        </Container>
    );
}

export default Register; 