import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {createContext, useState, useEffect} from 'react';
import {FaSpinner} from 'react-icons/fa';
import Login from './components/Login';
import Register from './components/Register';
import PrivacyPolicy from './components/PrivacyPolicy';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';

export const NotificationContext = createContext();

function App() {
    const [showModal, setShowModal] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [showText, setShowText] = useState(false);

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

    return (
        <NotificationContext.Provider value={{showNotification: displayNotification}}>
            <Router>
                <div className="App position-relative">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>
                        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                    </Routes>

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
                                0% { transform: translateX(-50%) translateY(-100%); width: 40px; border-radius: 50%; opacity: 0; }
                                50% { transform: translateX(-50%) translateY(0); width: 40px; border-radius: 50%; opacity: 1; }
                                100% { transform: translateX(-50%) translateY(0); width: 300px; border-radius: 20px; opacity: 1; }
                            }
                            @keyframes closeDynamicIsland {
                                0% { transform: translateX(-50%) translateY(0); width: 300px; border-radius: 20px; opacity: 1; }
                                50% { transform: translateX(-50%) translateY(0); width: 40px; border-radius: 50%; opacity: 1; }
                                100% { transform: translateX(-50%) translateY(-100%); width: 40px; border-radius: 50%; opacity: 0; }
                            }
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            </Router>
        </NotificationContext.Provider>
    );
}

export default App;
