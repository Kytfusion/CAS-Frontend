import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

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

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ThemeToggle />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/privacy" element={<PrivacyPolicy/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;