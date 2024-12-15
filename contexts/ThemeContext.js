import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    colors: {
      primary: 'red',
      background: isDarkMode ? '#1F2937' : '#F9FAFB',
      surface: isDarkMode ? '#374151' : '#FFFFFF',
      text: isDarkMode ? '#F9FAFB' : '#1F2937',
      textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

