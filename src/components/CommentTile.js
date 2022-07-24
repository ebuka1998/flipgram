/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Box, HStack, VStack, Avatar} from 'native-base';
import {ThemeContext} from '../context/ThemeContext';
import moment from 'moment';

const CommentTile = ({comment, activateReply, showReplies}) => {
  const {theme} = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Box width="100%">
        <HStack width="90%" marginBottom={2}>
          <Avatar
            bg="green.500"
            size="sm"
            marginTop={5}
            source={{
              uri:
                comment.userThatCommented?.profilePicture === ''
                  ? 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                  : comment.userThatCommented?.profilePicture,
            }}
          />
          <VStack mt={5}>
            <Text
              style={{
                color: theme === 'light' ? 'black' : 'white',
                paddingLeft: 5,
                fontSize: 12,
                fontWeight: '900',
              }}>
              {comment.userThatCommented?.username}
            </Text>
            <Text
              style={{
                color: theme === 'light' ? 'black' : 'white',
                paddingLeft: 5,
                fontSize: 16,
              }}>
              {comment.comment}
            </Text>
            <HStack alignItems="center">
              <Text
                style={{
                  color: theme === 'light' ? 'black' : 'white',
                  paddingLeft: 5,
                  fontSize: 12,
                  paddingTop: 5,
                }}>
                commented {moment(comment.timePosted).fromNow()}
              </Text>
              <TouchableOpacity activeOpacity={0.4} onPress={activateReply}>
                <Text
                  style={{
                    color: 'blue',
                    paddingLeft: 10,
                    fontSize: 14,
                    paddingTop: 5,
                    fontWeight: '700',
                  }}>
                  reply
                </Text>
              </TouchableOpacity>
            </HStack>
            {comment.children?.length > 0 ? (
              <Pressable onPress={() => setIsOpen(state => !state)}>
                <Text
                  style={{
                    color: 'blue',
                    marginTop: 8,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  {isOpen
                    ? 'hide replies'
                    : `view ${comment.children?.length} replies`}
                </Text>
              </Pressable>
            ) : null}
          </VStack>
        </HStack>
      </Box>
      {comment.children &&
        comment.children.length > 0 &&
        isOpen &&
        comment.children.map(c => (
          <View style={{marginLeft: 20}} key={c.id}>
            <CommentTile comment={c} />
          </View>
        ))}
    </>
  );
};

export default CommentTile;
