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

function App() {
  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;
