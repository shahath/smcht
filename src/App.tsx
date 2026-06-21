import { Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Directory from './pages/Directory';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';
import History from './pages/History';
import Projects from './pages/Projects';
import Donate from './pages/Donate';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-sans">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200 selection:text-slate-900 flex flex-col overflow-hidden text-slate-800">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/history" element={<History />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="py-12 bg-white border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} Hambantota St. Mary's College Old Boys Association.
        </p>
      </footer>
    </div>
  );
}

