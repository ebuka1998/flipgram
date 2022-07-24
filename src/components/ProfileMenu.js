/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Switch, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Menu, Pressable} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
// import {EventRegister} from 'react-native-event-listeners';
import {ThemeContext} from '../context/ThemeContext';

const ProfileMenu = () => {
  const {logUserOut} = useContext(AuthContext);
  const {toggleTheme, theme} = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    toggleTheme();
    setIsEnabled(previousState => !previousState);
  };
  return (
    <Menu
      w="190"
      trigger={triggerProps => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <Ionicons
              name="ellipsis-vertical"
              color={theme === 'light' ? 'black' : 'white'}
              size={18}
              style={{marginRight: 10}}
            />
          </Pressable>
        );
      }}
      bg={theme === 'light' ? 'white' : 'black'}>
      <Menu.Item onPress={() => logUserOut()}>
        <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
          Logout
        </Text>
      </Menu.Item>
      <Menu.Item color={theme === 'light' ? 'black' : 'white'}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
            {theme.toString()}
          </Text>
          <Switch
            onChange={toggleSwitch}
            value={isEnabled}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={theme === 'light' ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </Menu.Item>
    </Menu>
  );
};

export default ProfileMenu;
