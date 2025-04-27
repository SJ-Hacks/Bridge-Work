import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Gigs from './pages/Gigs'; 
import Volunteering from './pages/Volunteering';
import FullTime from './pages/FullTime';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/rewards" element={<h1>Rewards Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        <Route path="/volunteering" element={<Volunteering />} />
        <Route path="/fulltime" element={<FullTime />} />
      </Routes>
    </>
  );
}

export default App;
