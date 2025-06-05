import { createContext, useMemo, useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: mode === "light" ? "#f0f2f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
            sidebar: mode === "light" ? "#f9f9f9" : "#1a1a1a",
          },
          text: {
            primary: mode === "light" ? "#1a1a1a" : "#f5f5f5",
            secondary: mode === "light" ? "#6c757d" : "#b0bec5",
          },
          divider: mode === "light" ? "#e0e0e0" : "#333",
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
