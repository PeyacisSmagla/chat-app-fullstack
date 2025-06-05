import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const { sendMessages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    await sendMessages({ text, image: imagePreview });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <Box>
      {imagePreview && (
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            mb: 1,
          }}
        >
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              maxWidth: "200px",
              maxHeight: "150px",
              borderRadius: "8px",
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              bgcolor: "rgba(255,255,255,0.7)",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Paper
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "6px 12px",
          borderRadius: "24px",
          boxShadow: 2,
          width: "100%",
        }}
      >
        <IconButton onClick={() => fileInputRef.current?.click()} sx={{ mr: 1 }}>
          <ImageIcon />
        </IconButton>

        <InputBase
          sx={{ flex: 1, px: 1 }}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(e);
          }}
        />

        <IconButton
          type="submit"
          color="primary"
          disabled={!fileInputRef.current?.value && !text}
        >
          <SendIcon />
        </IconButton>

        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </Paper>
    </Box>
  );
};

export default InputMessage;
