import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useLanguage } from '../App';

function Home() {
    const { translate } = useLanguage();

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="text-dark mb-3 fs-1">
                    {translate('welcome')}
                </h1>
                <p className="text-dark">{translate('oneStopSolution')}</p>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="p-4 bg-light rounded">
                        <h2 className="text-dark mb-3 fs-2">
                            {translate('getStarted')}
                        </h2>
                        <p className="text-dark mb-4">
                            {translate('createAccount')}
                        </p>
                        <Link to="/register" className="text-decoration-none">
                            <Button
                                variant="primary"
                                className="w-100 bg-dark border-0 rounded py-2"
                            >
                                {translate('signUp')}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="p-4 bg-light rounded">
                        <h2 className="text-dark mb-3 fs-2">
                            {translate('alreadyHaveAccount')}
                        </h2>
                        <p className="text-dark mb-4">
                            {translate('signInToContinue')}
                        </p>
                        <Link to="/login" className="text-decoration-none">
                            <Button
                                variant="primary"
                                className="w-100 bg-primary border-0 rounded py-2"
                            >
                                {translate('signIn')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-dark mb-3 fs-2">
                    {translate('whyChooseUs')}
                </h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="p-3">
                            <h3 className="text-dark mb-2 fs-4">
                                {translate('easyToUse')}
                            </h3>
                            <p className="text-dark">
                                {translate('easyToUseDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3">
                            <h3 className="text-dark mb-2 fs-4">
                                {translate('secure')}
                            </h3>
                            <p className="text-dark">
                                {translate('secureDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3">
                            <h3 className="text-dark mb-2 fs-4">
                                {translate('support')}
                            </h3>
                            <p className="text-dark">
                                {translate('supportDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Home; 