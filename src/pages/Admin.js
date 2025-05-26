import {  Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { AuthContext } from '../context/AuthContext';
import Grid from '@mui/material/Grid';

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
    const { login, logout } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle admin login
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if entered credentials match a predefined admin
        const isAdmin = ADMINS.some(admin => admin.email === email && admin.password === password);

        if (isAdmin) {
            login(); // Update auth context
        } else {
            alert("Email or password is incorrect");
        }

    };

  return (
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
        Admin page
      </Typography >
      <Typography textAlign='center'>
        Here you can add, update, or delete projects (password protected of course 😉).
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
      <form onSubmit={handleSubmit}>
        <Box sx={formBoxSx} > 
        
            <TextField id="email" onChange={(e) => setEmail(e.target.value)} placeholde="" defaultValue="" label="Admin Email" variant="outlined"   required/>
      
            <TextField type='password' onChange={(e) => setPassword(e.target.value)} placeholde="" defaultValue="" id="password" label="Password"  variant="outlined"  required />

            <Button size="large" type='submit' variant="contained" endIcon={<LockOpenOutlinedIcon />}>
                Sign-In 
            </Button>
        
        </Box>
      </form>
    </Grid>

    </Grid>
  );
}

export default Admin;