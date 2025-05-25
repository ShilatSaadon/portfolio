import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function Home() {
  return (
    <Grid 
      container 
      direction="column"
      spacing={4}
      margin={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ p: 1 }} gutterBottom>
        Welcome to our portfolio!
      </Typography>
      <Typography variant='h5' sx={{ p: 1 }} textAlign='center'>
        Here you will find information about us, projects we have created and you can contact us.<br />
        </Typography>
        <Typography variant='h6' sx={{ p: 1 }}>
        Thank you for visiting our website.<br />
        </Typography>
        <Typography variant='subtitle1' sx={{ p: 1 }}>
        Shilat and Neta.
      </Typography>
    </Grid>
  );
}
export default Home;