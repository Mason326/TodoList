import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import createProjectImage from "../../../assets/createProjectDemo.jpg"
import addTaskImage from "../../../assets/addTaskDemo.jpg"
import { Box, Stack, Typography, Button } from "@mui/material";
import AppTheme from "../../../shared-theme/AppTheme";
import { AuthContext } from "../../../App";

export default function WelcomePage() {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    
  return (
    <AppTheme>
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 2 
        }}>
        <Stack spacing={4} sx={{ maxWidth: 1024, width: '100%' }} direction="row">
            <Box sx={{flexGrow: '1', maxWidth: '50%'}}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Welcome
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: "justify" }} >
                This app is designed for work organization; it works like notes in a notebook. However, this todolist also includes a feedback system and authorization features. We plan to integrate with ChatGPT for greater convenience.
            </Typography>
            <Box sx={{ marginY: 2.5 }}>
                <img src={createProjectImage} />
            </Box>
            <Typography color="text.secondary">
                I hope you enjoy this app! ☺️
            </Typography>
            </Box>
            <Stack spacing={7} sx={{ flexGrow: '2' }} alignSelf='center'>
            <Box>
                <img src={addTaskImage} />
            </Box>
            <Button 
                variant="contained"
                size="large"
                onClick={() => navigate(user ? '/dashboard' : '/signIn')}
                >
                Getting Started
            </Button>
            </Stack>
        </Stack>
        </Box>
    </AppTheme>
  );
};