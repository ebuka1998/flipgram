/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState('');
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        setTheme(value.toString());
      } else {
        setTheme('light');
      }
    } catch (e) {
      ToastAndroid.show('error getting theme data', ToastAndroid.SHORT);
      setTheme('light');
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  const toggleTheme = async () => {
    if (theme === 'light') {
      setTheme('dark');
      await AsyncStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      await AsyncStorage.setItem('theme', 'light');
    }
  };
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
