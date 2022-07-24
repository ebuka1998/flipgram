/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {Button, Input} from 'native-base';
import {AuthContext} from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import CommentTile from '../components/CommentTile';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentsScreen = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [isGettingComments, setIsGettingComments] = useState(false);
  const {postId, description} = route.params;
  const [comments, setComments] = useState([]);
  const {currentUser} = useContext(AuthContext);

  const [parentId, setParentId] = useState('');
  const [comment, setComment] = useState('');
  const inputRef = useRef();

  function list_to_tree(list) {
    var map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  const getPostComments = async () => {
    try {
      setIsGettingComments(true);
      const myLists = await firestore()
        .collection('comments')
        .where('postId', '==', postId)
        .get();
      const myComments = myLists.docs.map(doc => ({...doc.data(), id: doc.id}));
      setComments(list_to_tree(myComments));
      setIsGettingComments(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostComments();
  }, [postId]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('comments')
      .where('postId', '==', postId)
      .onSnapshot(documentSnapshot => {
        const myComments = documentSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments(list_to_tree(myComments));
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [postId]);

  const addComment = async () => {
    try {
      setLoading(true);
      await firestore().collection('comments').add({
        comment,
        postId,
        userThatCommented: currentUser,
        parentId: null,
        timePosted: Date.now(),
      });
      setComment('');
      await firestore()
        .collection('posts')
        .doc(postId)
        .update({
          comments: firestore.FieldValue.increment(1),
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const replyComment = async () => {
    try {
      setLoading(true);
      await firestore().collection('comments').add({
        comment,
        postId,
        userThatCommented: currentUser,
        parentId: parentId,
        timePosted: Date.now(),
      });
      setComment('');
      setParentId('');
      await firestore()
        .collection('posts')
        .doc(postId)
        .update({
          comments: firestore.FieldValue.increment(1),
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      {isGettingComments ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : (
        <View>
          <FlatList
            data={comments}
            style={{
              marginBottom: 50,
              width: '100%',
              paddingHorizontal: 5,
            }}
            ListHeaderComponent={
              <View
                style={{
                  width: '100%',
                  borderBottomColor: 'blue',
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: theme === 'light' ? 'black' : 'white',
                    fontSize: 18,
                  }}>
                  {description}
                </Text>
              </View>
            }
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 250,
                }}>
                <Ionicons
                  name="chatbubble"
                  color={theme === 'light' ? 'black' : 'white'}
                  size={80}
                />
                <Text
                  style={{
                    color: theme === 'light' ? 'black' : 'white',
                    fontSize: 20,
                    paddingTop: 10,
                  }}>
                  No Comments Yet
                </Text>
              </View>
            }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <CommentTile
                  comment={item}
                  activateReply={() => {
                    setParentId(item.id);
                    inputRef.current.focus();
                    setComment(`@${item.userThatCommented?.username}`);
                  }}
                />
              );
            }}
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 1,
          borderTopColor: 'gray',
          borderTopWidth: 1,
          paddingHorizontal: 5,
          backgroundColor: theme === 'light' ? 'white' : 'black',
          height: 50,
        }}>
        <Input
          size="lg"
          w="100%"
          color={theme === 'light' ? 'black' : 'white'}
          isDisabled={loading}
          variant="underlined"
          placeholder={`comment as ${currentUser.username}`}
          borderColor={theme === 'light' ? 'black' : 'white'}
          selectionColor={theme === 'light' ? 'black' : 'white'}
          placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          ref={inputRef}
          InputRightElement={
            <Button
              size="lg"
              variant="link"
              colorScheme="blue"
              isDisabled={comment.length > 0 ? false : true}
              onPress={parentId.length > 0 ? replyComment : addComment}>
              {parentId.length > 0 ? 'reply' : 'Post'}
            </Button>
          }
          value={comment}
          onChangeText={text => setComment(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default CommentsScreen;
