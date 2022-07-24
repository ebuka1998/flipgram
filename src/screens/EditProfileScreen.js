/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import React, {useContext, useState} from 'react';
import {Box, Input, Button, TextArea, HStack} from 'native-base';
import {AuthContext} from '../context/AuthContext';
import {ThemeContext} from '../context/ThemeContext';
import firestore from '@react-native-firebase/firestore';

const EditProfileScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const {username, bio} = route.params;
  const [nameToEdit, setNameToEdit] = useState(username);
  const [bioToEdit, setBioToEdit] = useState(bio);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateUser = async () => {
    setIsUpdating(true);
    await firestore()
      .collection('users')
      .doc(user?.uid)
      .update({
        username: nameToEdit === '' ? username : nameToEdit,
        bio: bioToEdit === '' ? bio : bioToEdit,
      });
    setIsUpdating(false);
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      <KeyboardAvoidingView style={styles.viewContainer}>
        <Text
          style={[
            styles.textStyle,
            {color: theme === 'light' ? 'black' : 'white'},
          ]}>
          Edit Your Account
        </Text>
        <Box alignItems="center" mt={10} w="100%">
          <Input
            size="lg"
            placeholder="email"
            w="100%"
            color={theme === 'light' ? 'black' : 'white'}
            keyboardType="default"
            onChangeText={text => setNameToEdit(text)}
            value={nameToEdit}
            borderColor={theme === 'light' ? 'black' : 'white'}
            selectionColor={theme === 'light' ? 'black' : 'white'}
            placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          />
        </Box>
        <Box alignItems="center" mt={10} w="100%">
          <TextArea
            h={20}
            placeholder="bio"
            color={theme === 'light' ? 'black' : 'white'}
            w="100%"
            onChangeText={text => setBioToEdit(text)}
            value={bioToEdit}
            maxLength={80}
            selectionColor={theme === 'light' ? 'black' : 'white'}
            borderColor={theme === 'light' ? 'black' : 'white'}
            placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          />
        </Box>
        <HStack justifyContent="flex-end" mt={3}>
          <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
            {bioToEdit?.length}/80
          </Text>
        </HStack>
        <Box alignItems="center" mt={8}>
          <Button
            alignContent="center"
            onPress={updateUser}
            w="100%"
            variant="subtle">
            {isUpdating ? 'updating' : 'Edit'}
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
export default EditProfileScreen;
