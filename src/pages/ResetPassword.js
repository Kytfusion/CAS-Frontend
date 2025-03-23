import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [step, setStep] = useState(0);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isCodeValid, setIsCodeValid] = useState(null);
    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);
    const inputRefs = useRef([]);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setIsPasswordValid(isValid);
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

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        validatePassword(value);
        validateConfirmPassword(confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmPassword(value);
    };

    const toggleNewPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 0 && isEmailValid) {
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

    const handleResendCode = () => {
        setTimer(60);
        setShowResendButton(false);
        // Here you would typically make an API call to resend the code
    };

    const getStepInstruction = () => {
        switch (step) {
            case 0:
                return 'Enter your email';
            case 1:
                return 'Enter verification code';
            case 2:
                return 'Set new password';
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
                <Form className="mt-3" onSubmit={handleNext}>
                    {step === 0 && (
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
                                    placeholder="Confirm New Password"
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
                                (step === 0 && !isEmailValid) ||
                                (step === 1 && !isCodeValid) ||
                                (step === 2 && (!isPasswordValid || !isConfirmPasswordValid))
                            }
                        >
                            {step === 2 ? 'Reset Password' : 'Next'}
                        </Button>
                    </div>
                </Form>
                <p className="text-start mt-3 w-100">
                    Remember your password? <Link to="/login" className="text-dark text-decoration-none">Sign In</Link>
                </p>
            </div>
        </Container>
    );
}

export default ResetPassword; 