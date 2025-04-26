import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css'

function App() {
  console.log("App component rendered");
  return (
    <>
      <NavBar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold">Welcome to BridgeWorks</h1>} />
          <Route path="/gigs" element={<h1 className="text-2xl font-semibold">Find Gigs</h1>} />
          <Route path="/rewards" element={<h1 className="text-2xl font-semibold">Rewards Marketplace</h1>} />
          <Route path="/profile" element={<h1 className="text-2xl font-semibold">Your Profile</h1>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
      </>
  );
}

export default App;

