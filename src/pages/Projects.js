import {
  Container, Alert, CircularProgress, Typography, Box, Button,
  Dialog, DialogActions, DialogContent, Grid, DialogTitle, TextField, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import React, { useState, useEffect, useContext } from 'react';
import projectsMock from '../data/projectsMock';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;


function Projects() {
    const { isLoggedIn } = useContext(AuthContext);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState('server');

    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [projectToDeleteId, setProjectToDeleteId] = useState(null);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '', description: '', image: '', siteLink: '', githubLink: ''
    });

    // Fetch projects from server or mock
    const fetchProjects = () => {
        setLoading(true);
        if (source === 'mock') {
            setProjects(projectsMock);
            setLoading(false);
        } else {
            axios.get(`${API_BASE}/api/projects`)
            . then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setError('Failed to load projects');
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [source]);

    // Edit handlers
    const handleEdit = (id) => {
        const project_to_edit = projects.find(p => p.id === id);
        setCurrentProject(project_to_edit);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setCurrentProject(null);
    };
    
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prevProject => ({
        ...prevProject,
        [name]: value,
    }));
  };

    // const handleSaveEdit = async () => {
    const handleSaveEdit = () => {
        if (!currentProject) return;
        if (source === "mock"){
            setProjects(prevProjects =>
                prevProjects.map(p => (p.id === currentProject.id ? currentProject : p))
            );
            handleCloseEditModal();
        }else{
            axios.put(`${API_BASE}/api/projects/${currentProject.id}`, currentProject)
            .then(() => {
                fetchProjects();
                handleCloseEditModal();
            })
            .catch(err => console.error('Error updating project:', err));
        }  
        
    };

    // Delete handlers
    const handleDelete = (id) => {
        setProjectToDeleteId(id);
        setOpenDeleteConfirm(true); 
    };

    const handleCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setProjectToDeleteId(null); 
    };

    const handleConfirmDelete = async () => {
        if (!projectToDeleteId) return;
        if (source === 'mock'){
            setProjects(prevProjects => prevProjects.filter(p => p.id !== projectToDeleteId));
            handleCloseDeleteConfirm(); 
        }else{
            axios.delete(`${API_BASE}/api/projects/${projectToDeleteId}`)
            .then(() => {
                fetchProjects();
                handleCloseDeleteConfirm(); 
            })
            .catch(err => console.error('Error deleting project:', err));
        }  
           
    };


    // Add project handlers
    const handleAddProjectChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleCloseAddModal = () =>{
        setOpenAddModal(false);
        setNewProject({ title: '', description: '', image: '', siteLink: '', githubLink: '' });
    };

    const handleSaveNewProject = () => {
        const newId = Math.max(...projects.map(p => p.id)) + 1;
        const projectToAdd = { id: newId, ...newProject };
        // Ensure optional fields exist so buttons render correctly
        if (!projectToAdd.githubLink) projectToAdd.githubLink = '';
        if (!projectToAdd.siteLink) projectToAdd.siteLink = '';
        if (source === 'mock'){
            setProjects(prev => [...prev, projectToAdd]);
            handleCloseAddModal();
        }else {
            axios.post(`${API_BASE}/api/projects`, newProject)
            .then(() => {
                fetchProjects();
                handleCloseAddModal();
            })
            .catch(err => console.error('Error adding project:', err));
        }     
        
    };

  return (
    <Container>
      <Typography variant="h2" sx={{ p: 1 }} textAlign='center' gutterBottom>
        Our Projects
      </Typography>
      <Typography variant='h5' sx={{ p: 1 }} textAlign='center'>
        Here you will find examples of projects I have done: websites, apps and more. 
      </Typography>
      {/* Toggle data source */}
      {isLoggedIn && 
      (<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup
          value={source}
          exclusive
          onChange={(e, newSource) => newSource && setSource(newSource)}
          aria-label="Data source"
        >
          <ToggleButton value="server" aria-label="Server">Server</ToggleButton>
          <ToggleButton value="mock" aria-label="Mock">Mock</ToggleButton>
        </ToggleButtonGroup>
        </Box>)}
      {isLoggedIn && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Button variant="contained" onClick={() => setOpenAddModal(true)}>+ Add Project</Button>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      
      {!loading && !error && projects.length === 0 && (
        <Typography variant='h5' sx={{ p: 1 }} textAlign='center'>
            No projects found.
        </Typography>
      )}
      
      {!loading && !error && projects.length > 0 && (
        <Grid container spacing={4} justifyContent="center">
            {projects.map((p) => (
                <Grid item key={p.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
                    <ProjectCard project={p} onEdit={handleEdit} onDelete={handleDelete}></ProjectCard>
                </Grid>
            ))}
        </Grid>

      )}
    
    {/* Edit Project Dialog */}
    <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          {currentProject && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={currentProject.title || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={currentProject.description || ''}
                onChange={handleFormChange}
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                label="Image URL"
                name="image"
                value={currentProject.image || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                label="Site Link"
                name="siteLink"
                value={currentProject.siteLink || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                label="GitHub Link"
                name="githubLink"
                value={currentProject.githubLink || ''}
                onChange={handleFormChange}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="error">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

       {/* Delete Confirmation Dialog */}   
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
            {projectToDeleteId && (
          <Typography id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be undone.
          </Typography>
            )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {['title', 'description', 'image', 'siteLink', 'githubLink'].map(field => (
              <TextField key={field} label={field.replace(/^[a-z]/, c => c.toUpperCase())} name={field} value={newProject[field]} onChange={handleAddProjectChange} fullWidth multiline={field === 'description'} rows={field === 'description' ? 4 : undefined} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)} color="error">Cancel</Button>
          <Button onClick={handleSaveNewProject} variant="contained" color="primary">Add Project</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Projects;