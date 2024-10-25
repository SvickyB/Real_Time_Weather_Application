import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './components/Weather';
import Alert from './components/Alert';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/Alerts" element={<Alert />} />
            </Routes>
        </Router>
    );
};

export default App;
