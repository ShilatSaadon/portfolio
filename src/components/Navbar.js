import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


function Navbar() {
const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          פורטפוליו שלי
        </Typography>
        <Button color="inherit" sx={{ my: 2, display: 'block' }} component={Link} to="/">Home</Button>
        <Button color="inherit" sx={{ my: 2, display: 'block' }} component={Link} to="/about">About</Button>
        <Button color="inherit" sx={{ my: 2, display: 'block' }} component={Link} to="/projects">Projects</Button>
        <Button color="inherit" sx={{ my: 2, display: 'block' }} component={Link} to="/contact">Contact</Button>
        <Button color="inherit" sx={{ my: 2, display: 'block' }} component={Link} to="/admin">Admin</Button>
        {isLoggedIn && (
            <Button color="inherit" sx={{ my: 2, display: 'block' }} onClick={logout} component={Link} to="/">Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;