/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import {HStack, VStack, Avatar, Button} from 'native-base';
import {ThemeContext} from '../context/ThemeContext';

const ProfileHeader = ({
  currentUser,
  changePhoto,
  navigateToEditScreeen,
  isUserProfile,
  followUnfollowUser,
  userId,
  isUploading,
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      <VStack
        alignItems="center"
        justifyContent="center"
        space={4}
        height={400}>
        <VStack alignItems="center" space={1}>
          {isUserProfile && isUploading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <Avatar
              bg="green.500"
              size="xl"
              source={{
                uri:
                  currentUser.profilePicture?.length === 0
                    ? 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                    : currentUser.profilePicture,
              }}
            />
          )}
          {isUserProfile && (
            <Pressable onPress={changePhoto}>
              <Text style={{color: 'blue'}}>change photo</Text>
            </Pressable>
          )}
        </VStack>
        <VStack alignItems="center" space={1}>
          <Text
            style={[
              styles.textStyle,
              {color: theme === 'light' ? 'black' : 'white'},
            ]}>
            {currentUser.username}
          </Text>
          <Text
            style={[
              styles.textStyle,
              {color: theme === 'light' ? 'black' : 'white'},
            ]}>
            {currentUser.email}
          </Text>
        </VStack>
        <HStack justifyContent="space-between" alignItems="center" width="60%">
          <VStack alignItems="center" space={1}>
            <Text
              style={[
                styles.textStyle,
                {color: theme === 'light' ? 'black' : 'white'},
              ]}>
              {currentUser.posts?.toString()}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {color: theme === 'light' ? 'black' : 'white'},
              ]}>
              Posts
            </Text>
          </VStack>
          <VStack alignItems="center" space={1}>
            <Text
              style={[
                styles.textStyle,
                {color: theme === 'light' ? 'black' : 'white'},
              ]}>
              {currentUser.followers?.length}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {color: theme === 'light' ? 'black' : 'white'},
              ]}>
              Followers
            </Text>
          </VStack>
          <VStack alignItems="center" space={1}>
            <Text
              style={[
                styles.textStyle,
                {color: theme === 'light' ? 'black' : 'white'},
              ]}>
              {currentUser.following?.length}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {color: theme === 'light' ? 'black' : 'white'},
              ]}>
              Following
            </Text>
          </VStack>
        </HStack>
        {isUserProfile ? (
          <Button
            size={'md'}
            variant="outline"
            color={'amber.100'}
            width="50%"
            onPress={navigateToEditScreeen}>
            Edit Profile
          </Button>
        ) : (
          <Button
            size={'md'}
            variant="outline"
            color={'blue'}
            width="50%"
            onPress={followUnfollowUser}>
            {currentUser?.followers?.includes(userId) ? 'following' : 'follow'}
          </Button>
        )}

        <Text style={[styles.bioTextStyle, {color: 'blue'}]}>
          {currentUser.bio}
        </Text>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
  },
  textStyle: {
    fontSize: 18,
  },
  bioTextStyle: {
    fontSize: 14,
    fontWeight: '900',
  },
});
export default ProfileHeader;
