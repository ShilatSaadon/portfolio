import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function About() {
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          padding={3}
          size={5}
          borderRadius={5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: 'secondary.light',
          }}
        >
          <Typography variant="h4" sx={{ p: 1 }} textAlign='center' gutterBottom>
            About This Website
          </Typography>
          <Typography variant='subtitle1' sx={{ p: 1 }} textAlign='center'>
            This website is a portfolio that showcases the projects we have developed throughout our journey as aspiring software developers.<br />
            It features a variety of fullstack applications, combining both frontend and backend technologies.<br />
            The goal of this site is to present our skills, creativity, and ability to bring real ideas to life through code.
          </Typography>
          <Typography variant='subtitle1' sx={{ p: 1 }} textAlign='center'>
            We designed and built this site from scratch to demonstrate our knowledge in areas such as React, Node.js, RESTful API development, UI design, and more.<br />
            Each project represents a milestone in our learning and growth.
          </Typography>
       
        </Grid>


        <Grid 
        container 
        direction="column"
         spacing={4}
          margin={5}
          padding={3}
          size={5}
          borderRadius={5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: 'secondary.light',
          }}
        >
          <Typography variant="h4" sx={{ p: 1 }} textAlign='center' gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" sx={{ p: 1 }} textAlign='center' gutterBottom>
            We are Neta Ronen and Shilat Saadon, Computer Science students at Tel-Hai College.
          </Typography>
          <Typography variant='subtitle1' sx={{ p: 1 }} textAlign='center'>
            Besides being partners in this portfolio, we are also close friends who share a strong passion for technology, coding, and continuous learning.<br />
            We both love exploring new tools, building useful and creative applications, and diving deep into problem solving.
          </Typography>
          <Typography variant='subtitle1' sx={{ p: 1 }} textAlign='center'>
           Working together on this project has allowed us to combine our strengths, challenge ourselves, and bring our shared vision to life.<br />
            We believe in teamwork, curiosity, and always pushing ourselves to improve.
          </Typography>
          <Typography variant='subtitle1' sx={{ p: 1 }} textAlign='center'>
            This website is not only a reflection of our skills, but also of the dedication, friendship, and enthusiasm that drive us forward in our journey as developers.
          </Typography>
          <Typography variant='h6' sx={{ p: 1 }} textAlign='center'>
            Feel free to explore, learn more about our work, and reach out if you’d like to connect!
          </Typography>

        
        </Grid>
    </Grid>
    </Box>
  );
}

export default About;