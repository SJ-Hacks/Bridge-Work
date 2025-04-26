import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BridgeWorks
        </Typography>
        <Button color="inherit" component={Link} to="/gigs">Gigs</Button>
        <Button color="inherit" component={Link} to="/rewards">Rewards</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
