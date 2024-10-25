import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlertMessage = ({ children, variant = 'default' }) => (
    <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
        <AlertCircle className="h-4 w-4" />
        <p>{children}</p>
    </div>
);

const AlertComponent = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [triggeredAlerts, setTriggeredAlerts] = useState([]);
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [condition, setCondition] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleBack = () => navigate(-1);

    const fetchAlerts = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/alerts');
            const data = await response.json();
            if (Array.isArray(data)) {
                setAlerts(data);
            } else {
                throw new Error('Expected an array of alerts');
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
            showMessage('Failed to fetch alerts', true);
        }
    }, []);

    const fetchTriggeredAlerts = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/triggered-alerts');
            const data = await response.json();
            if (Array.isArray(data)) {
                setTriggeredAlerts(data);
            } else {
                throw new Error('Expected an array of triggered alerts');
            }
        } catch (error) {
            console.error('Error fetching triggered alerts:', error);
            showMessage('Failed to fetch triggered alerts', true);
        }
    }, []);

    const showMessage = (msg, error = false) => {
        setMessage(msg);
        setIsError(error);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAddAlert = async (e) => {
        e.preventDefault();
        if (!city || !temperature || !condition || !email) {
            showMessage('Please fill in all fields', true);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/alerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city, temperature: parseFloat(temperature), condition, email }),
            });
            if (!response.ok) throw new Error('Failed to create alert');
            resetForm();
            fetchAlerts();
            showMessage('Alert created successfully!');
        } catch (error) {
            console.error('Error adding alert:', error);
            showMessage('Error creating alert', true);
        }
    };

    const resetForm = () => {
        setCity('');
        setTemperature('');
        setCondition('');
        setEmail('');
    };

    const handleDeleteAlert = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/alerts/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete alert');
            fetchAlerts();
            showMessage('Alert deleted successfully!');
        } catch (error) {
            console.error('Error deleting alert:', error);
            showMessage('Error deleting alert', true);
        }
    };

    const handleDeleteTriggeredAlert = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/triggered-alerts/${id}`, { method: 'DELETE' }); // Call the delete endpoint
            if (!response.ok) throw new Error('Failed to delete triggered alert');
            fetchTriggeredAlerts(); // Refresh triggered alerts
            showMessage('Triggered alert deleted successfully!');
        } catch (error) {
            console.error('Error deleting triggered alert:', error);
            showMessage('Error deleting triggered alert', true);
        }
    };

    useEffect(() => {
        fetchAlerts();
        fetchTriggeredAlerts();
    }, [fetchAlerts, fetchTriggeredAlerts]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center mb-6">
                    <button onClick={handleBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Go back">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold">Manage Weather Alerts</h1>
                </div>

                {message && <AlertMessage variant={isError ? "destructive" : "default"}>{message}</AlertMessage>}

                <form onSubmit={handleAddAlert} className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                            type="number"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            placeholder="Temperature (°C)"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Condition</option>
                            <option value="clear">Clear</option>
                            <option value="clouds">Cloudy</option>
                            <option value="rain">Rain</option>
                            <option value="snow">Snow</option>
                            <option value="extreme">Extreme</option>
                        </select>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" /> Add Alert
                    </button>
                </form>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Current Alerts</h2>
                    {alerts.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No alerts set.</p>
                    ) : (
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <span className="font-semibold">{alert.city}</span>
                                        <span className="mx-2">•</span>
                                        <span>{alert.temperature}°C</span>
                                        <span className="mx-2">•</span>
                                        <span className="capitalize">{alert.condition}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-gray-500">{alert.email}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteAlert(alert.id)}
                                        className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        aria-label="Delete alert"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Triggered Alerts</h2>
                    {triggeredAlerts.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No triggered alerts at this time.</p>
                    ) : (
                        <div className="space-y-3">
                            {triggeredAlerts.map((alert) => (
                                <div key={alert.id} className="flex items-center justify-between bg-yellow-50 p-4 rounded-lg">
                                    <div>
                                        <span className="font-semibold">{alert.city}</span>
                                        <span className="mx-2">•</span>
                                        <span>{alert.temperature}°C</span>
                                        <span className="mx-2">•</span>
                                        <span className="capitalize">{alert.condition}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-gray-500">{alert.email}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteTriggeredAlert(alert.id)} // Call the delete function
                                        className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        aria-label="Delete triggered alert"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertComponent;
