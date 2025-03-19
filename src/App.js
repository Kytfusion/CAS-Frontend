import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivacyPolicy from './components/PrivacyPolicy';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
