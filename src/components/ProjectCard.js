import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import Link from '@mui/material/Link'; 
import GitHubIcon from '@mui/icons-material/GitHub'; 
import LanguageIcon from '@mui/icons-material/Language'; 
import { AuthContext } from '../context/AuthContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';


function ProjectCard({ project, onEdit, onDelete }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!project) {
    return null; 
  }

  const {id, title, description, image, siteLink, githubLink} = project;

  // Trigger parent edit handler with project ID
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(id);
    }
  };
  // Trigger parent delete handler with project ID
  const handleDeleteClick = () => {
    if (onDelete){
      onDelete(id);
    }
  }; 

  return (
    <Card
      sx={{
        maxWidth: 345, 
        minWidth: 280, 
        borderRadius: '16px', 
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)', 
        flexDirection: 'column',
        backgroundColor: 'primary.main', 
        overflow: 'hidden', 
      }}
    >
      {/* Project image */}
      <Box sx={{ position: 'relative' , height: '50%'  }}>
        <CardMedia
          component="img"
          height="100%" 
          image={image}
          alt={title}
          sx={{ objectFit: 'cover', width: '100%' }}
        />
      </Box>

      {/* Project title and description */}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold', 
            mb: 1, 
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" > 
          {description}
        </Typography>
      </CardContent>

      {/* Action buttons */}
      <CardActions sx={{
        justifyContent: 'flex-start', 
        p: 2,
        borderTop: '1px solid rgba(76, 42, 38, 0.1)', 
      }}>
        {githubLink && (
          <Button
            size="medium" 
            color="inherit" 
            startIcon={<GitHubIcon />}
            component={Link}
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              
              textTransform: 'none', 
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)', 
              },
            }}
          >
            GitHub
          </Button>
        )}
        {siteLink && (
          <Button
            size="medium"
            color="inherit"
            startIcon={<LanguageIcon />} 
            component={Link}
            href={siteLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Live Site
          </Button>
        )}
        {isLoggedIn && (
          <Button
            size="medium"
            color="inherit"
            startIcon={<ModeEditIcon />} 
            onClick={handleEditClick}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Edit
          </Button>
        )}
        {isLoggedIn && (
          <Button
            size="medium"
            color="inherit"
            startIcon={<DeleteIcon />} 
            onClick={handleDeleteClick}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Delete
          </Button>
        )}
        
      </CardActions>
    </Card>
  );
}

export default ProjectCard;