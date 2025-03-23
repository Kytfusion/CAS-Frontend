import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="text-dark mb-3 fs-1">
                    Welcome to Our Platform
                </h1>
                <p className="text-dark">Your one-stop solution for all your needs</p>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="p-4 bg-light rounded">
                        <h2 className="text-dark mb-3 fs-2">
                            Get Started
                        </h2>
                        <p className="text-dark mb-4">
                            Create an account to access all features and start using our platform.
                        </p>
                        <Link to="/register" className="text-decoration-none">
                            <Button
                                variant="primary"
                                className="w-100 bg-dark border-0 rounded py-2"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="p-4 bg-light rounded">
                        <h2 className="text-dark mb-3 fs-2">
                            Already Have an Account?
                        </h2>
                        <p className="text-dark mb-4">
                            Sign in to your existing account to continue using our services.
                        </p>
                        <Link to="/login" className="text-decoration-none">
                            <Button
                                variant="outline-primary"
                                className="w-100 bg-light border-0 rounded py-2"
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-dark mb-3 fs-2">
                    Why Choose Us?
                </h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="p-3">
                            <h3 className="text-dark mb-2 fs-4">
                                Easy to Use
                            </h3>
                            <p className="text-dark">
                                Our platform is designed with user experience in mind, making it simple and intuitive to use.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3">
                            <h3 className="text-dark mb-2 fs-4">
                                Secure
                            </h3>
                            <p className="text-dark">
                                We prioritize your security and implement the latest security measures to protect your data.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3">
                            <h3 className="text-dark mb-2 fs-4">
                                24/7 Support
                            </h3>
                            <p className="text-dark">
                                Our dedicated support team is always ready to help you with any questions or concerns.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Home; 