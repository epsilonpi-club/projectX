import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SACLayout from './components/layout/SACLayout';
import Dashboard from './pages/Dashboard';
import PendingRequests from './pages/PendingRequests';
import EventReview from './pages/EventReview';
import Calendar from './pages/Calendar';
import Documents from './pages/Documents';
import './App.css';

function App() {
    return (
        <Router>
            <SACLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/pending" element={<PendingRequests />} />
                    <Route path="/review/:eventId" element={<EventReview />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/documents" element={<Documents />} />
                </Routes>
            </SACLayout>
        </Router>
    );
}

export default App;
