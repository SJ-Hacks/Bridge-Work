import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<h1>Gigs Page</h1>} />
        <Route path="/rewards" element={<h1>Rewards Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
