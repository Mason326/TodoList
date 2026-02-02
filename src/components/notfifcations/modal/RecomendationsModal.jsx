import { useState, useEffect, useRef, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import gptBlackIcon from "../../../assets/chat-gpt-black.svg";
import gptWhiteIcon from "../../../assets/chat-gpt-white.svg";
import { Dialog } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { askGPT } from "../../../api/gpt/requestGPT";
import { AppContext } from "../../../context/AppContext";
import fetchMessages from "../../../api/chat/chat";

export default function Recomendations({ open, onClose }) {
  // const { projects, allTasks } = useContext(AppContext);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if(open) {
  //     const projectWithTasks = {};
  //     for(const project of projects) {
  //       projectWithTasks[`${project.project_name}`] = allTasks.filter(item => item.project_id == project.project_id);
  //     }
  //     // askGPT(JSON.stringify(projectWithTasks))
  //     //   .then((data) => {
  //     //     setMessages(() => {
  //     //       localStorage.setItem("lastPrompt", JSON.stringify({ user_prompt: "Hi can you help me with task solving?", ai_response: `${data}`, prompt_date: new Date(), response_date: new Date()}))
  //     //       return [ {  text: "Hi can you help me with task solving?", time: `${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'user'  }, { text: `${data}`, time: `${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, sender: 'ai' }]
  //     //     })
  //     //   })
  //   } else {
  //     setMessages(() => {

  //     })
  //   }
  // }, [open])

  useEffect(() => {
    fetchMessages().then((data) => {
      data.sort(compareDates);
      setMessages(
        data.map((item) => {
          return {
            text: `${item.message_content}`,
            time: new Date(item.created_at),
            sender: `${item.message_owner}`,
          };
        }),
      );
    });
  }, []);

  function compareDates(a, b) {
    if (a.created_at > b.created_at) return 1;
    if (a.created_at == b.created_at) return 0;
    if (a.created_at < b.created_at) return -1;
  }

  function placeDateIfNeeded(currentIndex) {
    const currentMsg = messages[currentIndex];
    const prevMsg = messages[currentIndex - 1];

    if (currentIndex === 0) {
      const currentDate = currentMsg.time;
      return formatDateText(currentDate);
    }

    const currentDate = currentMsg.time;
    const prevDate = prevMsg.time;

    if (!isSameDay(currentDate, prevDate)) {
      return formatDateText(currentDate);
    }

    return null;
  }

  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function formatDateText(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
      return (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ my: 2, fontSize: "0.875rem" }}
        >
          Today
        </Typography>
      );
    } else if (isSameDay(date, yesterday)) {
      return (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ my: 2, fontSize: "0.875rem" }}
        >
          Yesterday
        </Typography>
      );
    } else {
      return (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ my: 2, fontSize: "0.875rem" }}
        >
          {date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      );
    }
  }

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
          <Stack sx={{ width: "100%", textAlign: "center" }} spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box>
                <img
                  srcSet={gptBlackIcon}
                  alt="gpt"
                  width="56px"
                  height="56px"
                />
              </Box>
              <Typography variant="h4">ChatGPT Assistant</Typography>
            </Box>
            <Typography
              color="text.secondary"
              component="div"
              sx={{ textAlign: "justify" }}
            >
              This ChatGPT Assistant is able to provide recommendations on how
              to complete assigned tasks in projects.
            </Typography>
            <Box
              sx={{
                height: 300,
                overflow: "auto",
                mb: 2,
                p: 2,
                bgcolor: "#f8f9fa",
                borderRadius: 2,
              }}
            >
              <List sx={{ width: "100%" }}>
                {messages.map((msg, index) => (
                  <Box key={index}>
                    {placeDateIfNeeded(index)}
                    <ListItem
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        alignItems: "flex-start",
                        width: "100%",
                        px: 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection:
                            msg.sender === "user" ? "row-reverse" : "row",
                          alignItems: "flex-start",
                          maxWidth: "80%",
                        }}
                      >
                        <ListItemAvatar
                          sx={{
                            minWidth: "auto",
                            mr: msg.sender === "user" ? 0 : 1,
                            ml: msg.sender === "user" ? 1 : 0,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor:
                                msg.sender === "user"
                                  ? "primary.main"
                                  : "black",
                              width: 36,
                              height: 36,
                            }}
                          >
                            {msg.sender === "user" ? (
                              <PersonIcon fontSize="small" />
                            ) : (
                              <img
                                srcSet={gptWhiteIcon}
                                alt="gpt"
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <pre
                          style={{
                            margin: 0,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            maxWidth: "100%",
                            overflowWrap: "break-word",
                          }}
                        >
                          <ListItemText
                            primary={msg.text}
                            secondary={msg.time.toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            sx={{
                              bgcolor:
                                msg.sender === "user" ? "#e3f2fd" : "#f5f5f5",
                              p: 1.5,
                              borderRadius: 2,
                              wordBreak: "break-word",
                              textAlign:
                                msg.sender === "user" ? "right" : "left",
                            }}
                            primaryTypographyProps={{
                              color: "text.primary",
                              fontSize: "0.9rem",
                            }}
                            secondaryTypographyProps={{
                              fontSize: "0.75rem",
                              mt: 0.5,
                            }}
                          />
                        </pre>
                      </Box>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button size="small" onClick={onClose}>
            Thanks, Bye!
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
