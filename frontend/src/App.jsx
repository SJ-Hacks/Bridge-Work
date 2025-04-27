import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
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



import SignInSignUp from './pages/SignInSignUp'; // <-- Import your new login page

function App() {
  return (
      <GoogleOAuthProvider clientId="1026581693709-gnl3aqd28jsskbl4dovcn3ncaejrf0oh.apps.googleusercontent.com">
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
        <Route path="/signin" element={<SignInSignUp />} />


      </Routes>
    </>
      </GoogleOAuthProvider>
  );
}

export default App;