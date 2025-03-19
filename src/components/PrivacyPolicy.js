import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="text-center w-100" style={{ maxWidth: '600px' }}>
                <h2 className="text-dark mb-3" style={{ fontSize: '2rem' }}>
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

export default PrivacyPolicy;
