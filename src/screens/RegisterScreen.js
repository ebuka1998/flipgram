/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Box, Input, Button, HStack} from 'native-base';
import {ThemeContext} from '../context/ThemeContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useContext(ThemeContext);

  const registerUser = async () => {
    try {
      setIsLoading(true);
      const user = await auth().createUserWithEmailAndPassword(
        email.toLowerCase(),
        password.toLowerCase(),
      );
      if (user) {
        await createUser(user.user.uid);
      }
      setIsLoading(false);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already in use', `${email} is already registered`, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email', `${email} is invalid`, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      }
      setIsLoading(false);
    }
  };

  const createUser = async userId => {
    try {
      await firestore().collection('users').doc(userId).set({
        username,
        email,
        followers: [],
        following: [],
        profilePicture: '',
        bio: '',
        posts: 0,
      });
    } catch (error) {
      Alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.viewContainer}>
        <Text
          style={[
            styles.textStyle,
            {color: theme === 'light' ? 'black' : 'white'},
          ]}>
          Register Your Account
        </Text>
        <Box alignItems="center" mt={10} w="100%">
          <Input
            size="lg"
            placeholder="email"
            w="100%"
            color={theme === 'light' ? 'black' : 'white'}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
            value={email}
            borderColor={theme === 'light' ? 'black' : 'white'}
            selectionColor={theme === 'light' ? 'black' : 'white'}
            placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          />
        </Box>
        <Box alignItems="center" mt={10} w="100%">
          <Input
            size="lg"
            placeholder="username"
            w="100%"
            color={theme === 'light' ? 'black' : 'white'}
            keyboardType="default"
            onChangeText={text => setUsername(text)}
            value={username}
            borderColor={theme === 'light' ? 'black' : 'white'}
            selectionColor={theme === 'light' ? 'black' : 'white'}
            placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          />
        </Box>
        <Box alignItems="center" mt={10} w="100%">
          <Input
            size="lg"
            placeholder="password"
            w="100%"
            color={theme === 'light' ? 'black' : 'white'}
            keyboardType="visible-password"
            onChangeText={text => setPassword(text)}
            value={password}
            type="password"
            borderColor={theme === 'light' ? 'black' : 'white'}
            selectionColor={theme === 'light' ? 'black' : 'white'}
            placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          />
        </Box>
        <HStack
          justifyContent="flex-end"
          alignItems="center"
          mt={5}
          spacing={3}>
          <Text style={{color: 'blue'}}>already have an account ? </Text>
          <Button variant="link" onPress={() => navigation.navigate('Login')}>
            Login
          </Button>
        </HStack>
        <Box alignItems="center" mt={8}>
          <Button
            alignContent="center"
            onPress={registerUser}
            w="100%"
            variant="subtle"
            disabled={
              username.length === 0 ||
              email.length === 0 ||
              password.length === 0
                ? true
                : false
            }>
            {isLoading ? 'submitting...' : 'Register'}
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    paddingHorizontal: 20,
  },
  textStyle: {
    fontSize: 20,
  },
});

export default RegisterScreen;
