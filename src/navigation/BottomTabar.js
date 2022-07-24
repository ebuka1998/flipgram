/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, {useContext} from 'react';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'native-base';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import {BottoSheetContext} from '../context/BottomSheetContext';
import ProfileMenu from '../components/ProfileMenu';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';

const BottomTabar = () => {
  const Tab = createBottomTabNavigator();
  const {theme} = useContext(ThemeContext);
  const {currentUser} = useContext(AuthContext);
  const {onOpen} = useContext(BottoSheetContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme === 'light' ? 'white' : 'black'},
        headerTintColor: theme === 'light' ? 'black' : 'white',
        tabBarStyle: {
          backgroundColor: theme === 'light' ? 'white' : 'black',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 1,
            color: theme === 'light' ? 'black' : 'white',
          },
          tabBarIcon: ({focused, size, color}) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={theme === 'light' ? 'black' : 'white'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 1,
            color: theme === 'light' ? 'black' : 'white',
          },
          tabBarIcon: ({focused, size}) => (
            <Ionicons
              name={focused ? 'md-search-sharp' : 'md-search-outline'}
              color={theme === 'light' ? 'black' : 'white'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 1,
            color: theme === 'light' ? 'black' : 'white',
          },
          tabBarIcon: ({focused, size}) => (
            <Ionicons
              name="md-add-circle-sharp"
              color={theme === 'light' ? 'black' : 'white'}
              size={32}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            onOpen();
            // navigation.navigate('CameraScreen');
          },
        })}
      />
      <Tab.Screen
        name="Activity"
        component={NotificationScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 1,
            color: theme === 'light' ? 'black' : 'white',
          },
          tabBarIcon: ({focused, size}) => (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              color={theme === 'light' ? 'black' : 'white'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 1,
            color: theme === 'light' ? 'black' : 'white',
          },
          tabBarIcon: ({focused, size}) => (
            <Avatar
              bg="blue.500"
              alignSelf="center"
              size="xs"
              borderWidth={focused ? 3 : 0}
              borderColor={theme === 'light' ? 'black' : 'white'}
              source={{
                uri:
                  currentUser?.profilePicture === ''
                    ? 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                    : currentUser?.profilePicture,
              }}></Avatar>
          ),
          headerRight: () => <ProfileMenu />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabar;
