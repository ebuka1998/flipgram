/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {Box, HStack, VStack, Avatar} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReadMore from 'react-native-read-more-text';
import {AuthContext} from '../context/AuthContext';
import {ThemeContext} from '../context/ThemeContext';
import moment from 'moment';

const PostCard = ({post, likePost, navigateToComments}) => {
  const {user} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const renderTruncatedFooter = handlePress => {
    return (
      <Text style={{color: 'blue', marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const renderRevealedFooter = handlePress => {
    return (
      <Text style={{color: 'blue', marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  };
  return (
    <Box w="100%" marginBottom={3}>
      <Box bg={theme === 'light' ? 'white' : 'black'} h="16">
        <VStack justifyContent="center" h="16" paddingLeft="4">
          <HStack alignItems="center">
            <Avatar
              bg="green.500"
              size="md"
              source={{
                uri:
                  post?.userPosted?.profilePicture === ''
                    ? 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                    : post?.userPosted?.profilePicture,
              }}
            />
            <Text
              style={{
                color: theme === 'light' ? 'black' : 'white',
                paddingLeft: 10,
                fontSize: 18,
              }}>
              {post?.userPosted?.username}
            </Text>
          </HStack>
        </VStack>
      </Box>
      <Box>
        <Image
          source={{uri: post?.postImage}}
          resizeMode="cover"
          style={{width: '100%', height: 500}}
        />
      </Box>
      <Box bg={theme === 'light' ? 'white' : 'black'}>
        <VStack justifyContent="center" paddingLeft="4" paddingTop="4">
          <HStack
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            mt="2">
            <HStack alignItems="center">
              <FontAwesome
                name="heart"
                size={30}
                color={
                  post?.usersThatLiked?.includes(user?.uid) ? 'red' : 'gray'
                }
                onPress={likePost}
              />
              <FontAwesome
                name="comments"
                size={30}
                style={{paddingLeft: 20}}
                color="gray"
                onPress={navigateToComments}
              />
            </HStack>
            {/* <Box paddingRight="4">
              <FontAwesome name="bookmark-o" size={30} color="gray" />
            </Box> */}
          </HStack>
          {post.likes === 0 ? null : (
            <Text
              style={{
                color: theme === 'light' ? 'black' : 'white',
                paddingVertical: 3,
                marginTop: 3,
              }}>
              {post.likes === 0 ? '' : `${post.likes?.toString()} likes`}
            </Text>
          )}

          {post.description.length > 0 ? (
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}>
              <Text
                style={{
                  color: theme === 'light' ? 'black' : 'white',
                  fontSize: 14,
                }}>
                {post?.description}
              </Text>
            </ReadMore>
          ) : null}

          <TouchableOpacity onPress={navigateToComments} activeOpacity={0.8}>
            <Text
              style={{
                color: theme === 'light' ? 'black' : 'white',
                paddingVertical: 8,
              }}>
              {post.comments === 0
                ? 'view comments'
                : `View ${post.comments?.toString()} comments`}
            </Text>
          </TouchableOpacity>
          <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
            posted {moment(post.timePosted).fromNow()}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default PostCard;
