import {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import gptBlackIcon from "../../../assets/chat-gpt-black.svg";
import gptWhiteIcon from "../../../assets/chat-gpt-white.svg";
import { Dialog } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { askGPT } from '../../../api/gpt/requestGPT';
import { useContext } from 'react';
import { AuthContext } from '../../../App';

export default function Recomendations({open, onClose}) {
  const {user} = useContext(AuthContext)
  const prepArr = JSON.parse(localStorage.getItem('lastPrompt'))
  const [messages, setMessages] = useState(prepArr.user_id != '' ? [
    { text: `${prepArr.user_prompt}`, time: `${new Date(`${prepArr.prompt_date}`).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'user' },
    { text: `${prepArr.ai_response}`, time: `${new Date(`${prepArr.response_date}`).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'ai' },
  ] : [
    { text: "Can you help me with project tasks?", time: `${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'user' }
  ]);
  const promptDate = new Date(JSON.parse(localStorage.getItem("lastPrompt")).prompt_date);
  promptDate.setDate(promptDate.getDate() + 1);
  promptDate.setHours(0,0,0,0);
  const firstBoot = useRef(true && new Date() > promptDate )

  useEffect(() => {
    if(open && firstBoot.current) {
      setMessages(prev => { 
        localStorage.setItem("lastPrompt", JSON.stringify({ user_id: user.id, user_prompt: messages[0].text, ai_response: `sdfjk dlsg jdsgjskdj dskgjsdj jdjgjj jdsjgkd`, prompt_date: new Date(), response_date: new Date()}))
        return [{  text: `${messages[0].text}`, time: `${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'user'  }, { text: `This response should crack your ass`, time: `${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'ai' }]
      })
      firstBoot.current = false
    }
  }, [open])

  return (
     <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Stack sx={{ width: "100%", textAlign: 'center' }} spacing={2}>
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
            <Typography color='text.secondary'>Today</Typography>
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
                      secondary={msg.time}
                      sx={{
                        bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                        p: 1.5,
                        borderRadius: 2,
                        wordBreak: 'break-word',
                        textAlign: 'right'
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
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button size="small" onClick={onClose}>Thanks, Bye!</Button>
      </CardActions>
    </Card>
    </Dialog>
  );
}