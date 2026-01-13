import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import ProposeEvent from './pages/ProposeEvent';
import EventDetail from './pages/EventDetail';
import EventCalendar from './pages/EventCalendar';
import Members from './pages/Members';
import ClubProfile from './pages/ClubProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<ProposeEvent />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile" element={<ClubProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
