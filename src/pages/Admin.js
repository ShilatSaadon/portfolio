import {  Typography, Snackbar, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { AuthContext } from '../context/AuthContext';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// List of hardcoded admin users
const ADMINS = [
    {email: 'netaRonen@gmail.com', password:'neta123'},
    {email: 'shilatSaadon@gmail.com', password:'shilat123'},
];

// Styling for the form box
const formBoxSx = {
  display: 'flex',
  flexDirection: 'column',
  p: 1,
  m: 1,
  flexWrap: 'wrap',
  '& .MuiTextField-root': { m: 1, width: '25ch', alignSelf: 'center' },
  '& .MuiButton-root': { m: 1, width: '25ch', alignSelf: 'center' }
};

function Admin() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false); 

    // Handle admin login
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if entered credentials match a predefined admin
        const isAdmin = ADMINS.some(admin => admin.email === email && admin.password === password);

        if (isAdmin) {
            login(); // Update auth context
            setSuccessOpen(true); // show success message
            setTimeout(() => navigate('/projects'), 1000); // navigate after success
        } else {
            setErrorOpen(true); // show error message
        }

    };

  return (
    <>
    <Grid
      container 
      direction="row"
      spacing={2}
      margin={1}
      sx={{
        justifyContent: "center",
        alignItems: "stretch",
       }}
    >
        <Grid 
        container 
        direction="column"
         spacing={4}
          margin={5}
          padding={5}
          size={5}
          borderRadius={5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: 'secondary.light',
          }}
        >
      <Typography variant="h3" gutterBottom textAlign='center'>
        Admin Page
      </Typography >
      <Typography variant="h6" textAlign='center'>
        This page is accessible only to authorized <strong>admin users</strong>.<br/>
        Once you log in, you'll unlock full access to add, edit, or delete portfolio projects —
        but all actions are performed exclusively on the <strong>Projects</strong> page.
      </Typography>
      </Grid>

          <Grid 
        container 
        direction="column"
         spacing={4}
          margin={5}
          padding={5}
          size={5}
          borderRadius={5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: 'secondary.light',
          }}
        >
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box sx={formBoxSx} > 
        
            <TextField id="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} placeholde="" defaultValue="" label="Admin Email" variant="outlined"   required/>
      
            <TextField type='password' autoComplete="off" onChange={(e) => setPassword(e.target.value)} placeholde="" defaultValue="" id="password" label="Password"  variant="outlined"  required />

            <Button size="large" type='submit' variant="contained" endIcon={<LockOpenOutlinedIcon />}>
                Sign-In 
            </Button>
        
        </Box>
      </form>
    </Grid>

    </Grid>

    {/* Error Snackbar */}
      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
          Email or password is incorrect
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar open={successOpen} autoHideDuration={2000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
    </>

    
  );
}

export default Admin;