/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabar from './BottomTabar';
import CameraScreen from '../screens/CameraScreen';
import EditingScreen from '../screens/EditingScreen';
import PostScreen from '../screens/PostScreen';
import {AuthContext} from '../context/AuthContext';
import EditProfileScreen from '../screens/EditProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import {ThemeContext} from '../context/ThemeContext';
import CommentsScreen from '../screens/CommentsScreen';
import SplashScreen from '../screens/SplashScreen';

const MainNav = () => {
  const {user, initializing} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const RootStack = createNativeStackNavigator();
  if (initializing) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!user ? (
          <RootStack.Group>
            <RootStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen
              name="Tabs"
              component={BottomTabar}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="UserProfile"
              component={UserProfileScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                headerStyle: {
                  backgroundColor: theme === 'light' ? 'white' : 'black',
                },
                headerTintColor: theme === 'light' ? 'black' : 'white',
              }}
            />
            <RootStack.Screen
              name="EditImage"
              component={EditingScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Post"
              component={PostScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerTitle: 'Edit',
                headerStyle: {
                  backgroundColor: theme === 'light' ? 'white' : 'black',
                },
                headerTintColor: theme === 'light' ? 'black' : 'white',
              }}
            />
          </RootStack.Group>
        )}

        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{headerShown: false}}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
