import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import gptBlackIcon from "../../../assets/chat-gpt-black.svg";
import gptWhiteIcon from "../../../assets/chat-gpt-white.svg";
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
      { text: "Can you help me with project tasks?", sender: 'user' },
      { text: "Yeah! Just show them to me", sender: 'ai' },
      { text: "{Some data you need to provide}", sender: 'user' },
  ]);
  const [input, setInput] = React.useState('');
  return (
    <Box sx={{ minWidth: 350, maxWidth: 720, width: 720 }}>
    <Card variant="outlined" sx={{ p: 1}}>
      <CardContent>
        <Stack sx={{ maxWidth: 850, width: "100%", textAlign: 'center' }} spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }} >
                  <Box>
                      <img srcSet={gptBlackIcon} alt="gpt" width='56px' height='56px' />
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
            <List sx={{ width: '100%' }}>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                    px: 0
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    maxWidth: '80%'
                  }}>
                    <ListItemAvatar sx={{ 
                      minWidth: 'auto',
                      mr: msg.sender === 'user' ? 0 : 1,
                      ml: msg.sender === 'user' ? 1 : 0
                    }}>
                      <Avatar sx={{ 
                        bgcolor: msg.sender === 'user' ? 'primary.main' : 'black',
                        width: 36,
                        height: 36
                      }}>
                        {msg.sender === 'user' ? <PersonIcon fontSize="small" /> : <img srcSet={gptWhiteIcon} alt='gpt' style={{ width: 20, height: 20 }} />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.text}
                      secondary="10:00"
                      sx={{
                        bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                        p: 1.5,
                        borderRadius: 2,
                        wordBreak: 'break-word',
                        textAlign: msg.sender === 'user' ? 'right' : 'left'
                      }}
                      primaryTypographyProps={{
                        color: 'text.primary',
                        fontSize: '0.9rem'
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.75rem',
                        mt: 0.5
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">Thanks, Bye!</Button>
      </CardActions>
    </Card>
    </Box>
  );
}