import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Gigs from './pages/Gigs'; 
import Volunteering from './pages/Volunteering';
import FullTime from './pages/FullTime';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import PostJob from './pages/PostJob';
import MyPostedJobs from './pages/MyPostedJobs';
import EditJob from './pages/EditJob';
import Applications from './pages/Applications';




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
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/applications/:jobId" element={<Applications />} />


      </Routes>
    </>
  );
}

export default App;
