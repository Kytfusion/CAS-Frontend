import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, InputGroup, Button, ProgressBar} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaVenus, FaMars, FaImage, FaTrash, FaCheck} from 'react-icons/fa';
import { useLanguage } from '../App';

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
    const { translate } = useLanguage();

    useEffect(() => {
        let interval;
        if (timer > 0 && !showResendButton) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setShowResendButton(true);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer, showResendButton]);

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

    const handleRemoveImage = () => {
        setProfileImage(null);
        setProfileImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (step === 0 && isEmailValid && isPasswordValid && isConfirmPasswordValid && agreePrivacy) {
            setStep(1);
        } else if (step === 1 && isCodeValid) {
            setStep(2);
        } else if (step === 2 && isFirstNameValid && isLastNameValid) {
            setStep(3);
        } else if (step === 3 && gender) {
            setStep(4);
        } else if (step === 4 && birthDate) {
            setStep(5);
        } else if (step === 5) {
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
                return translate('createYourAccount');
            case 1:
                return translate('enterVerificationCode');
            case 2:
                return translate('firstName');
            case 3:
                return translate('gender');
            case 4:
                return translate('birthDate');
            case 5:
                return translate('profileImage');
            default:
                return '';
        }
    };

    const getStepLabel = (stepNumber) => {
        switch (stepNumber) {
            case 0:
                return translate('createYourAccount');
            case 1:
                return translate('enterVerificationCode');
            case 2:
                return translate('completeYourProfile');
            case 3:
                return translate('gender');
            case 4:
                return translate('birthDate');
            case 5:
                return translate('profileImage');
            default:
                return '';
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{maxWidth: '400px'}}>
                <div className="mb-4">
                    <div className="position-relative">
                        <div 
                            className="position-absolute w-100" 
                            style={{
                                height: '2px',
                                background: '#e9ecef',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 1
                            }}
                        >
                            <div 
                                style={{
                                    height: '100%',
                                    width: `${(step / 5) * 100}%`,
                                    background: '#28a745',
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </div>
                        
                        <div className="d-flex justify-content-between position-relative" style={{zIndex: 2}}>
                            {[0, 1, 2, 3, 4, 5].map((stepNumber) => (
                                <div 
                                    key={stepNumber}
                                    className="d-flex flex-column align-items-center"
                                >
                                    <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            background: stepNumber <= step ? '#28a745' : '#e9ecef',
                                            border: '2px solid',
                                            borderColor: stepNumber <= step ? '#28a745' : '#e9ecef',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {stepNumber < step ? (
                                            <FaCheck className="text-white" size={12} />
                                        ) : (
                                            <div 
                                                className="rounded-circle"
                                                style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    background: stepNumber === step ? '#28a745' : '#e9ecef'
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div 
                                        className="small mt-2"
                                        style={{
                                            color: stepNumber <= step ? '#28a745' : '#6c757d',
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        {getStepLabel(stepNumber)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
                                    placeholder={translate('email')}
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
                                    placeholder={translate('password')}
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
                                    placeholder={translate('confirmNewPassword')}
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
                                    <span className="ms-1">
                                        {translate('agreePrivacy')} <Link to="/privacy" className="text-dark text-decoration-none">{translate('privacyPolicyLink')}</Link>
                                    </span>
                                }
                                checked={agreePrivacy}
                                onChange={(e) => setAgreePrivacy(e.target.checked)}
                                className="mb-3 d-flex align-items-center gap-1"
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
                                <p className="mb-3">Retrimitere cod în {timer} secunde</p>
                            ) : (
                                <Button
                                    variant="link"
                                    onClick={handleResendCode}
                                    className="mb-3 text-dark text-decoration-none p-0"
                                >
                                    Retrimite codul
                                </Button>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <>
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
                                    placeholder={translate('firstName')}
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
                                    placeholder={translate('lastName')}
                                    className="bg-transparent border-0 text-dark"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </InputGroup>
                        </>
                    )}

                    {step === 3 && (
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                variant={gender === 'male' ? 'primary' : 'outline-primary'}
                                onClick={() => setGender('male')}
                                className="flex-grow-1"
                            >
                                <FaMars className="me-2"/>
                                {translate('male')}
                            </Button>
                            <Button
                                variant={gender === 'female' ? 'primary' : 'outline-primary'}
                                onClick={() => setGender('female')}
                                className="flex-grow-1"
                            >
                                <FaVenus className="me-2"/>
                                {translate('female')}
                            </Button>
                        </div>
                    )}

                    {step === 4 && (
                        <Form.Control
                            type="date"
                            className="mb-3 bg-light rounded"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    )}

                    {step === 5 && (
                        <>
                            <div className="position-relative" style={{ width: '100px', margin: '0 auto' }}>
                                <div
                                    className="mb-3 bg-light rounded-circle d-flex align-items-center justify-content-center"
                                    onClick={handleImageContainerClick}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        cursor: 'pointer',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {profileImagePreview ? (
                                        <img
                                            src={profileImagePreview}
                                            alt={translate('profileImage')}
                                            className="w-100 h-100"
                                            style={{objectFit: 'cover'}}
                                        />
                                    ) : (
                                        <FaImage size={30} className="text-secondary"/>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                        style={{display: 'none'}}
                                    />
                                </div>
                                {profileImagePreview && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="position-absolute top-0 end-0 rounded-circle p-1"
                                        onClick={handleRemoveImage}
                                        style={{ transform: 'translate(25%, -25%)' }}
                                    >
                                        <FaTrash size={12} />
                                    </Button>
                                )}
                            </div>
                            <p className="text-muted small mb-3">{translate('optional')}</p>
                        </>
                    )}

                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            className="w-100 bg-dark text-white border-0 rounded py-2"
                            disabled={
                                (step === 0 && (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !agreePrivacy)) ||
                                (step === 1 && !isCodeValid) ||
                                (step === 2 && (!isFirstNameValid || !isLastNameValid)) ||
                                (step === 3 && !gender) ||
                                (step === 4 && !birthDate)
                            }
                        >
                            {step === 5 ? translate('completeRegistration') : translate('next')}
                        </Button>
                    </div>
                </Form>
                <p className="text-start mt-3 w-100">
                    {step > 0 ? (
                        <span 
                            onClick={handlePreviousStep} 
                            style={{cursor: 'pointer'}} 
                            className="text-dark text-decoration-none"
                        >
                            {translate('backToRegistration')}
                        </span>
                    ) : (
                        <>
                            {translate('alreadyHaveAccountLogin')} <Link to="/login" className="text-dark text-decoration-none">{translate('signInLink')}</Link>
                        </>
                    )}
                </p>
            </div>
        </Container>
    );
}

export default Register; 