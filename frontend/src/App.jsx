import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Gigs from './pages/Gigs'; 
import Volunteering from './pages/Volunteering';
import FullTime from './pages/FullTime';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';




function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/volunteering" element={<Volunteering />} />
        <Route path="/fulltime" element={<FullTime />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
