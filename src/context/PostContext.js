/* eslint-disable prettier/prettier */
import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const PostContext = createContext();

export const PostContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const [flipPosts, setFlipPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userPostsLoading, setUserPostsLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const posts = await firestore()
        .collection('posts')
        .orderBy('timePosted', 'desc')
        .get();
      setFlipPosts(posts.docs.map(doc => ({...doc.data(), id: doc.id})));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .orderBy('timePosted', 'desc')
      .onSnapshot(documentSnapshot => {
        setFlipPosts(
          documentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id})),
        );
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const getUserPosts = async userId => {
    try {
      setUserPostsLoading(true);
      const myLists = await firestore()
        .collection('posts')
        .where('userId', '==', userId)
        .get();
      setUserPosts(myLists.docs.map(doc => ({...doc.data(), id: doc.id})));
      setUserPostsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRealTimePost = userId => {
    firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot(documentSnapshot => {
        setUserPosts(
          documentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id})),
        );
      });
  };

  const likePost = async (postId, userId, usersLiked) => {
    try {
      await firestore()
        .collection('posts')
        .doc(postId)
        .update({
          likes: usersLiked.includes(userId)
            ? firestore.FieldValue.increment(-1)
            : firestore.FieldValue.increment(1),
          usersThatLiked: usersLiked.includes(userId)
            ? firestore.FieldValue.arrayRemove(userId)
            : firestore.FieldValue.arrayUnion(userId),
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        loading,
        flipPosts,
        userPosts,
        userPostsLoading,
        likePost,
        getUserPosts,
        getUserRealTimePost,
      }}>
      <>{props.children}</>
    </PostContext.Provider>
  );
};
