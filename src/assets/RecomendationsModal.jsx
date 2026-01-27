import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import gptIcon from "../../../assets/chat-gpt-black.svg";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Recomendations() {
    const [messages, setMessages] = React.useState([
    { text: "Привет! Какой у вас вопрос по проекту?", sender: 'ai' },
    { text: "Привет! Какой у вас вопрос по проекту?", sender: 'user' },
    { text: "Привет! Какой у вас вопрос по проекту?", sender: 'ai' },
    { text: "Привет! Какой у вас вопрос по проекту?", sender: 'user' },
    { text: "Привет! Какой у вас вопрос по проекту?", sender: 'ai' },
    { text: "Привет! Какой у вас вопрос по проекту?", sender: 'user' },
  ]);
  const [input, setInput] = React.useState('');
  return (
    <Box sx={{ minWidth: 500, maxWidth: 550 }}>
      <Card variant="outlined">
    <CardContent>
       <Stack sx={{ maxWidth: 550, width: "100%", textAlign: 'center' }} spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }} >
                <Box>
                    <img srcSet={gptIcon} alt="gpt" width='56px' height='56px' />
                </Box>
                <Typography variant="h4">ChatGPT Assistant</Typography>
            </Box>
            <Typography color='text.secondary' component="div" sx={{ textAlign: 'justify' }}>
                This ChatGPT Assistant is able to provide recommendations on how to complete assigned tasks in projects.
            </Typography>
                   <Box sx={{ 
          height: 300, 
          overflow: 'auto', 
          mb: 2, 
          p: 2, 
          bgcolor: '#f8f9fa',
          borderRadius: 2 
        }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem 
                key={index}
                sx={{
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main' 
                  }}>
                    {msg.sender === 'user' ? <PersonIcon /> : <img srcSet={gptIcon} />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg.text}
                  sx={{
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                    bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                    p: 2,
                    borderRadius: 2,
                    maxWidth: '80%',
                    ml: msg.sender === 'user' ? 0 : 2,
                    mr: msg.sender === 'user' ? 2 : 0,
                  }}
                  primaryTypographyProps={{
                    color: 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        </Stack>
    </CardContent>
    <CardActions sx={{ justifySelf: 'flex-end' }}>
      <Button size="small">Thanks, Bye!</Button>
    </CardActions>
      </Card>
    </Box>
  );
}
