import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Product from './pages/Product';
import Personas from './pages/Personas';
import FAQ from './pages/FAQ';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
