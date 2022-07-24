/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import ProfileHeader from '../components/ProfileHeader';
import UserProfileHeader from '../components/UserProfileHeader';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {ThemeContext} from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserProfileScreen = ({route, navigation}) => {
  const width = Dimensions.get('screen').width;
  const {name, userId} = route.params;
  const {user, currentUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const [profileUser, setProfileUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userPostsLoading, setUserPostsLoading] = useState(false);

  const getUser = async () => {
    const userToAdd = await firestore().collection('users').doc(userId).get();
    setProfileUser(userToAdd.data());
  };

  const getUserPosts = async () => {
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

  useEffect(() => {
    getUser();
    getUserPosts(userId);
  }, [userId]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setProfileUser(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);

  const followUnfollowUser = async userFollowing => {
    try {
      if (!userFollowing.includes(userId)) {
        await firestore()
          .collection('users')
          .doc(user?.uid)
          .update({
            following: firestore.FieldValue.arrayUnion(userId),
          });

        await firestore()
          .collection('users')
          .doc(userId)
          .update({
            followers: firestore.FieldValue.arrayUnion(user?.uid),
          });
      } else {
        await firestore()
          .collection('users')
          .doc(user?.uid)
          .update({
            following: firestore.FieldValue.arrayRemove(userId),
          });

        await firestore()
          .collection('users')
          .doc(userId)
          .update({
            followers: firestore.FieldValue.arrayRemove(user?.uid),
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === 'light' ? 'white' : 'black',
        },
      ]}>
      <UserProfileHeader
        headerText={name}
        navigateBack={() => navigation.goBack()}
      />
      <Tabs.Container
        headerContainerStyle={{
          backgroundColor: theme === 'light' ? 'white' : 'black',
          marginTop: 60,
        }}
        renderHeader={() => (
          <ProfileHeader
            isUserProfile={false}
            currentUser={profileUser}
            followUnfollowUser={() =>
              followUnfollowUser(currentUser?.following)
            }
            userId={user?.uid}
          />
        )}>
        <Tabs.Tab name="Posts">
          {userPostsLoading ? (
            <View style={styles.loadingStyle}>
              <ActivityIndicator color="blue" size="large" />
            </View>
          ) : (
            <Tabs.FlatList
              style={{
                marginTop: 60,
                backgroundColor: theme === 'light' ? 'white' : 'black',
              }}
              data={userPosts}
              ListEmptyComponent={
                <View style={styles.loadingStyle}>
                  <Ionicons
                    name="md-lock-closed"
                    color={theme === 'light' ? 'black' : 'white'}
                    size={80}
                  />
                  <Text
                    style={{
                      color: theme === 'light' ? 'black' : 'white',
                      fontSize: 20,
                      paddingTop: 10,
                    }}>
                    No posts Yet
                  </Text>
                </View>
              }
              renderItem={({item}) => {
                return (
                  <Image
                    source={{uri: item.postImage}}
                    style={{
                      height: 150,
                      width: width / 3,
                      marginRight: 1,
                      marginBottom: 1,
                    }}
                    resizeMode="cover"
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              key={'#'}
              keyExtractor={item => item.id}
              numColumns={3}
            />
          )}
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
export default UserProfileScreen;
