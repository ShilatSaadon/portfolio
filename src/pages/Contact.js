import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import {  Typography } from '@mui/material';

function Contact() {
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
            Contact information
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ContactMailIcon></ContactMailIcon>
            <Typography variant="h6" sx={{ p: 1 }} marginBottom={0} textAlign='center' gutterBottom>
            Neta - netaronen29@gmail.com
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ContactMailIcon></ContactMailIcon>
            <Typography variant="h6" marginBottom={0} sx={{ p: 1 }} textAlign='center' gutterBottom>
            Shilat - shilat2462@gmail.com
            </Typography>
          </Box>
          
            
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
    <Box 
      component="form"
      sx={{
        display:'flex',
        flexDirection:'column',
        p: 1,
        m: 1,
        flexWrap: 'wrap',
        '& .MuiTextField-root': { m: 1, width: '25ch', alignSelf: 'center' }, 
        '& .MuiButton-root': { m: 1, width: '25ch', alignSelf: 'center' }
      }}
    > 
        <TextField id="name" label="Your Name" variant="outlined" />
      
        <TextField  id="email" label="Your email" variant="outlined" />

        <TextField id="msgText" label="Write your message..."  variant="outlined" multiline rows={4} />

        <Button size="large" variant="contained" endIcon={<SendIcon />}>
            Send Message
        </Button>
    </Box>
    </Grid> 
    </Grid>
  );
}

export default Contact;