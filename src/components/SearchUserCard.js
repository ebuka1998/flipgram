/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {Box, HStack, VStack, Avatar} from 'native-base';
import {ThemeContext} from '../context/ThemeContext';

const SearchUserCard = ({user, goToUserDetails}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={goToUserDetails} activeOpacity={0.8}>
      <Box h="16" marginBottom={2}>
        <VStack justifyContent="center" h="16" paddingLeft="2">
          <HStack alignItems="center">
            <Avatar
              bg="green.500"
              size="lg"
              source={{
                uri:
                  user?.profilePicture === ''
                    ? 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                    : user?.profilePicture,
              }}
            />
            <VStack>
              <Text
                style={{
                  color: theme === 'light' ? 'black' : 'white',
                  paddingLeft: 10,
                  fontSize: 18,
                }}>
                {user?.username}
              </Text>
              <Text
                style={{
                  color: theme === 'light' ? 'black' : 'white',
                  paddingLeft: 10,
                  fontSize: 14,
                }}>
                {user?.email}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default SearchUserCard;
