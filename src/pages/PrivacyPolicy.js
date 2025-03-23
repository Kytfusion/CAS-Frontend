import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useLanguage } from '../App';

function PrivacyPolicy() {
    const { translate } = useLanguage();

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="text-dark mb-3 fs-1">
                    {translate('privacyPolicy')}
                </h1>
                <p className="text-dark">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-dark mb-3 fs-2">
                    1. Introduction
                </h2>
                <p className="text-dark mb-3">
                    Welcome to our Privacy Policy. This document explains how we collect, use, and protect your personal information when you use our service.
                </p>
                <p className="text-dark">
                    By using our service, you agree to the collection and use of information in accordance with this policy.
                </p>
            </div>

            <div className="mb-4">
                <h2 className="text-dark mb-3 fs-2">
                    2. Information We Collect
                </h2>
                <p className="text-dark mb-3">
                    We collect information that you provide directly to us, including:
                </p>
                <ul className="text-dark">
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Profile information</li>
                    <li>Account credentials</li>
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-dark mb-3 fs-2">
                    3. How We Use Your Information
                </h2>
                <p className="text-dark mb-3">
                    We use the information we collect to:
                </p>
                <ul className="text-dark">
                    <li>Provide and maintain our service</li>
                    <li>Improve and personalize your experience</li>
                    <li>Communicate with you</li>
                    <li>Protect against fraud and unauthorized access</li>
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-dark mb-3 fs-2">
                    4. Data Security
                </h2>
                <p className="text-dark">
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                </p>
            </div>

            <div className="mb-4">
                <h2 className="text-dark mb-3 fs-2">
                    5. Contact Us
                </h2>
                <p className="text-dark">
                    If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-dark">
                    Email: privacy@example.com
                </p>
            </div>

            <div className="text-center mt-5">
                <Link to="/register" className="text-decoration-none">
                    <Button
                        variant="primary"
                        className="w-100 bg-dark text-white border-0 rounded py-2"
                    >
                        {translate('backToRegistration')}
                    </Button>
                </Link>
            </div>
        </Container>
    );
}

export default PrivacyPolicy; 