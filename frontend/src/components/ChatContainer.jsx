import { useTheme } from "@emotion/react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useLayoutEffect } from "react";
import ChatHeader from "./ChatHeader";
import InputMessage from "./InputMessage";

const renderSkeletonMessages = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
        mb: 1,
      }}
    >
      <Skeleton
        variant="rounded"
        width={`${60 + Math.random() * 100}px`}
        height={32}
        animation="wave"
      />
    </Box>
  ));
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatContainer = () => {
  const theme = useTheme();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();

    return () => {
      unSubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    unSubscribeFromMessages,
    subscribeToMessages,
  ]);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ChatHeader />

      {/* Messages area */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: theme.palette.background.default,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[400],
            borderRadius: "4px",
          },
        }}
      >
        {isMessagesLoading ? (
          renderSkeletonMessages()
        ) : (
          <Box>
            {messages.map((msg, index) => {
              const isFromOtherUser = msg.senderId === selectedUser._id;
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: isFromOtherUser ? "flex-start" : "flex-end",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: isFromOtherUser
                        ? theme.palette.grey[300]
                        : theme.palette.primary.main,
                      color: isFromOtherUser
                        ? theme.palette.text.primary
                        : "#fff",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      maxWidth: "60%",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text && (
                      <Box sx={{ mb: msg.image ? 1 : 0 }}>{msg.text}</Box>
                    )}

                    {msg.image && (
                      <Box
                        component="img"
                        src={msg.image}
                        alt="chat-img"
                        sx={{
                          width: "100%",
                          borderRadius: 1,
                          maxHeight: 200,
                          objectFit: "cover",
                          mb: 0.5,
                        }}
                      />
                    )}

                    {msg.createdAt && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "right",
                          opacity: 0.6,
                          fontSize: "0.75rem",
                          mt: 0.5,
                        }}
                      >
                        {formatTime(msg.createdAt)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Input box fixed at bottom */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          p: 1.5,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <InputMessage />
      </Box>
    </Box>
  );
};

export default ChatContainer;
