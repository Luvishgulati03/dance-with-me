import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Product from './pages/Product';
import Personas from './pages/Personas';
import FAQ from './pages/FAQ';
import EventsAndStudios from './pages/EventsAndStudios';
import FeaturePage from './pages/FeaturePage';
import BadgesPage from './pages/BadgesPage';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ContentEditor from './admin/ContentEditor';
import EventsManager from './admin/EventsManager';
import StudiosManager from './admin/StudiosManager';
import PlansManager from './admin/PlansManager';
import FAQManager from './admin/FAQManager';
import FeaturesManager from './admin/FeaturesManager';
import PersonasManager from './admin/PersonasManager';
import MediaManager from './admin/MediaManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="plans" element={<Plans />} />
          <Route path="product" element={<Product />} />
          <Route path="personas" element={<Personas />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="events" element={<EventsAndStudios />} />
          <Route path="features/badges" element={<BadgesPage />} />
          <Route path="features/:featureSlug" element={<FeaturePage />} />
        </Route>

        {/* Admin panel */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="events" element={<EventsManager />} />
          <Route path="studios" element={<StudiosManager />} />
          <Route path="plans" element={<PlansManager />} />
          <Route path="faqs" element={<FAQManager />} />
          <Route path="features" element={<FeaturesManager />} />
          <Route path="personas" element={<PersonasManager />} />
          <Route path="media" element={<MediaManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
