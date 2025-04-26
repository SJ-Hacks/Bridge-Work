import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">BridgeWorks</Link>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex space-x-8 text-gray-700 font-medium">
        <NavLink
          to="/gigs"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'hover:text-blue-400')}
        >
          Gigs
        </NavLink>
        <NavLink
          to="/rewards"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'hover:text-blue-400')}
        >
          Rewards
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'hover:text-blue-400')}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
