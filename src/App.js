import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import { Button, Dropdown } from 'react-bootstrap';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations/translations.json';

const ThemeContext = createContext();
const LanguageContext = createContext();

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'eng';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const translate = (key) => {
        return translations[language][key] || key;
    };

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, translate, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Button
            variant="outline-primary"
            onClick={toggleTheme}
            className="position-fixed top-0 end-0 m-3 rounded-circle p-2"
            style={{ width: '40px', height: '40px' }}
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </Button>
    );
}

function LanguageSelector() {
    const { language, changeLanguage, translate } = useLanguage();

    return (
        <Dropdown className="position-fixed top-0 start-0 m-3">
            <Dropdown.Toggle variant="outline-primary" className="rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                <FaGlobe />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('md')}>Română</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('ru')}>Русский</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('eng')}>English</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <Router>
                    <ThemeToggle />
                    <LanguageSelector />
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>
                        <Route path="/privacy" element={<PrivacyPolicy/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;