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
import auth from '@react-native-firebase/auth';
import {ThemeContext} from '../context/ThemeContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useContext(ThemeContext);

  const loginUser = async () => {
    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(
        email.toLowerCase(),
        password.toLowerCase(),
      );
      setIsLoading(false);
    } catch (error) {
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
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.viewContainer}>
        <Text
          style={[
            styles.textStyle,
            {color: theme === 'light' ? 'black' : 'white'},
          ]}>
          Login Here
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
          <Text style={{color: 'blue'}}>don't have an account ? </Text>
          <Button
            variant="link"
            onPress={() => navigation.navigate('Register')}>
            Register
          </Button>
        </HStack>
        <Box alignItems="center" mt={8}>
          <Button
            alignContent="center"
            onPress={loginUser}
            w="100%"
            variant="subtle"
            disabled={
              email.length === 0 || password.length === 0 ? true : false
            }>
            {isLoading ? 'submitting...' : 'Login'}
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
export default LoginScreen;
