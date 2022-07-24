/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

const NotificationScreen = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
        NotificationScreen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default NotificationScreen;
