import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CircularProgress,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import CloseIcon from "@mui/icons-material/Close";
import Markdown from "react-markdown";

import {
  countInputOutputTokens,
  getConversationHistoryByUserId,
  getMessagesByThreadId,
  getTranscription,
  sendMessageToAI,
} from "domain/ai/aiController";
import { logToBackend } from "domain/logMessage/logMessageController";

import { selectCurrentChallenge } from "store/challenges/challengesSelectors";
import { selectUserUID } from "store/users/usersSelectors";
import { addToastNotification } from "store/notifications/notificationsSlice";
import { Sender } from "utils/constants/enums/SenderReceiverEnum";
import { LogSeverity } from "utils/constants/enums/LogSeverityEnum";

import SideBar from "./SideBar";
import ProgressBar from "components/common/ProgressBar";

import MarkdownStyles from "./Markdown.module.scss";
import { addThreadsAction } from "store/challenges/challengeSlice";

// Function to convert audio blob to base64
const audioBlobToBase64 = (audioBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(audioBlob);
  });
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const MessageList = styled(List)({
  flexGrow: 1,
  overflow: "auto",
  height: "50vh",
  scrollBehavior: "smooth",
});

const MessageItem = styled(ListItem)(({ theme, align }) => ({
  justifyContent: align === "right" ? "flex-end" : "flex-start",
  flexDirection: "column",
  alignItems: align === "right" ? "flex-end" : "flex-start",
  "& .MuiListItemText-root": {
    maxWidth: "70%",
    backgroundColor: align === "right" ? "#02aba7" : theme.palette.grey[300],
    color:
      align === "right"
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
  },
}));

const MessageTime = styled(Typography)(({ theme, align }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
  alignSelf: align === "right" ? "flex-end" : "flex-start",
}));

const ChallengePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const { assistantId, threadId } = useParams();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [usageTokens, setUsageTokens] = useState({
    input: 0,
    output: 0,
    totalInput: 0,
    totalOutput: 0,
    totalUsage: 0,
  });

  const userId = useSelector(selectUserUID);
  const currentChallenge = useSelector(selectCurrentChallenge);
  const currentThreadId = currentChallenge?.currentThread.id;
  const triggerConversation = currentChallenge?.trigger;
  const promptConversation = currentChallenge?.prompt;

  const [audioDuration, setAudioDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [totalAudioDuration, setTotalAudioDuration] = useState(0);

  const recordingStartTime = useRef(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const startRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/mp3",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          const duration = (Date.now() - recordingStartTime.current) / 1000;
          setAudioDuration(duration);
          setTotalAudioDuration((prev) => prev + duration);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: Sender.USER,
              audioUrl: audioUrl,
            },
          ]);
          transcribeAudio(audioBlob);
          setIsRecording(false);
        };

        mediaRecorder.current.start();
        recordingStartTime.current = Date.now();
        setIsRecording(true);
        console.log("Started recording");
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      console.log("Stopped recording");
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setIsTranscribing(true);
    try {
      const base64Audio = await audioBlobToBase64(audioBlob);

      const result = await getTranscription(base64Audio);

      if (result?.transcription) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: Sender.USER, content: result?.transcription },
        ]);
        setInputValue(result?.transcription);
        const response = await sendMessageToAI(
          userId,
          currentThreadId,
          assistantId,
          result?.transcription
        );

        console.log("response is", response);
        setMessages((prevMessages) => {
          return [
            ...prevMessages,
            { sender: Sender.ASSISTANT, content: response.content },
          ];
        });

        setInputValue("");
      }
    } catch (error) {
      console.error("Error during transcription:", error);
    } finally {
      setIsTranscribing(false);
      setIsRecording(false);
    }
  };

  // Fetch input tokens when the prompt conversation changes
  useEffect(() => {
    (async () => {
      const [inputTokens] = await Promise.all([
        await countInputOutputTokens(promptConversation),
      ]);

      setUsageTokens((prevTokens) => {
        return {
          input: inputTokens,
          output: prevTokens.output,
          totalInput: prevTokens.totalInput + inputTokens,
          totalOutput: prevTokens.totalOutput,
          totalUsage: prevTokens.totalUsage + inputTokens,
        };
      });
    })();
  }, [promptConversation, threadId]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (inputValue.trim()) {
        setMessages([
          ...messages,
          { sender: Sender.USER, content: inputValue },
        ]);
        setInputValue("");
        setLoading(true);
        console.time("func:sendMessageToAI");
        logToBackend(
          "func:sendMessageToAI start",
          "ai_assistant",
          LogSeverity.INFO
        );
        try {
          const response = await sendMessageToAI(
            userId,
            currentThreadId,
            assistantId,
            inputValue
          );

          console.log("response is ", response);
          console.timeEnd("func:sendMessageToAI");
          if (response?.progression >= 0) {
            setProgress(response.progression);
          }
          if (response?.content) {
            setMessages((prevMessages) => {
              return [
                ...prevMessages,
                { sender: Sender.ASSISTANT, content: response.content },
              ];
            });
          }

          scrollToBottom();
        } catch (error) {
          console.log("getting here an error", error);
          dispatch(
            addToastNotification({
              id: uuidv4(),
              message: JSON.stringify(error?.description),
              type: "error",
            })
          );
        }
        setLoading(false);

        logToBackend(
          "func:sendMessageToAI finish",
          "ai_assistant",
          LogSeverity.INFO
        );
        console.log("We set the runId because we submitted the form");
        const inputTokens = await countInputOutputTokens(inputValue.trim());
        setUsageTokens((prevTokens) => {
          return {
            input: inputTokens,
            output: prevTokens.output,
            totalInput: prevTokens.totalInput + inputTokens,
            totalOutput: prevTokens.totalOutput,
            totalUsage: prevTokens.totalUsage + inputTokens,
          };
        });
        if (messageListRef.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }
      }
    },
    [assistantId, inputValue, messages, currentThreadId, userId, dispatch]
  );

  useEffect(() => {
    if (triggerConversation) {
      setInputValue(triggerConversation);
    }
  }, [triggerConversation]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([
        ...messages,
        { sender: Sender.USER, content: `File uploaded: ${file.name}` },
      ]);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getConversationHistoryByUserId(userId);

      dispatch(addThreadsAction(Object.values(response)));
    })();
  }, [userId, dispatch]);

  // Fetch messages when the threadId changes
  useEffect(() => {
    if (currentThreadId && userId) {
      (async () => {
        setLoading(true);
        const response = await getMessagesByThreadId(currentThreadId, userId);
        const messages = response?.messages?.map((message) => ({
          content: message?.contents?.[0]?.value || "",
          time: new Date(message.createdAt).toLocaleString(),
          sender: message.sender,
        }));
        setLoading(false);
        setMessages(messages);
        setProgress(response.lastProgress);
      })();
    }
  }, [currentThreadId, setLoading, userId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, overflow: "hidden" }}>
      <Grid container spacing={3} sx={{ height: { xs: "0", md: "85vh" } }}>
        <Grid item xs={12} md={3} sx={{ height: "100%", py: 5 }}>
          <SideBar
            userId={userId}
            usageTokens={usageTokens}
            audioDuration={audioDuration}
            totalAudioDuration={totalAudioDuration}
          />
        </Grid>
        <Grid item xs={12} md={9} sx={{ height: "100%", p: 5 }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Défi : Préparation d'interview
            </Typography>
            <ProgressBar progress={progress} />
            <MessageList ref={messageListRef}>
              {(messages || []).map((message, index) => (
                <React.Fragment key={index}>
                  <MessageItem
                    align={message.sender === "USER" ? "right" : "left"}
                  >
                    {message.content && (
                      <ListItemText>
                        <div className={MarkdownStyles.markdownContent}>
                          <Markdown>{message.content}</Markdown>
                        </div>
                      </ListItemText>
                    )}
                    <MessageTime
                      align={message.sender === "USER" ? "right" : "left"}
                    >
                      {message.time}
                    </MessageTime>
                    {message.audioUrl && (
                      <Box>
                        <audio controls src={message.audioUrl}>
                          Your browser does not support the audio element.
                        </audio>
                      </Box>
                    )}
                  </MessageItem>
                </React.Fragment>
              ))}
              {loading && <CircularProgress size={24} />}
              {isTranscribing && <CircularProgress size={24} />}
            </MessageList>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                position: { xs: "fixed", sm: "static" },
                bottom: { xs: 0, sm: "auto" },
                left: { xs: 0, sm: "auto" },
                right: { xs: 0, sm: "auto" },
                padding: "10px",
                boxShadow: { xs: "0 -2px 10px rgba(0,0,0,0.1)", sm: "none" },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: {
                  xs: "white !important",
                  sm: "inherit !important",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  disabled={isRecording || isTranscribing}
                />
                <label htmlFor="file-upload">
                  <IconButton
                    component="span"
                    disabled={isRecording || isTranscribing}
                    sx={{
                      width: "35px",
                      backgroundColor: {
                        xs: "white !important",
                        sm: "inherit !important",
                      },
                    }}
                  >
                    <AttachFileIcon />
                  </IconButton>
                </label>
                <IconButton
                  onMouseDown={!isDesktop ? startRecording : null}
                  onMouseUp={!isDesktop ? stopRecording : null}
                  onMouseLeave={!isDesktop ? stopRecording : null}
                  onTouchStart={!isDesktop ? startRecording : null}
                  onTouchCancel={!isDesktop ? stopRecording : null}
                  onTouchEnd={!isDesktop ? stopRecording : null}
                  onClick={isDesktop ? startRecording : null}
                  color={isRecording ? "secondary" : "default"}
                  disabled={isTranscribing}
                  sx={{
                    backgroundColor: {
                      xs: "white !important",
                      sm: "inherit !important",
                    },
                  }}
                >
                  {isRecording ? <CircularProgress size={24} /> : <MicIcon />}
                </IconButton>
                {isRecording && isDesktop && (
                  <IconButton
                    onClick={stopRecording}
                    disabled={isTranscribing}
                    sx={{
                      backgroundColor: {
                        xs: "white !important",
                        sm: "inherit !important",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                inputProps={{ inputMode: "text", autoComplete: "off" }}
                disabled={isRecording || isTranscribing}
                multiline
                minRows={1}
                maxRows={4}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Box>
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={isRecording || isTranscribing}
                  sx={{
                    width: "35px",
                    backgroundColor: {
                      xs: "white !important",
                      sm: "inherit !important",
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChallengePage;
