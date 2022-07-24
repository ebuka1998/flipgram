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
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import ProfileHeader from '../components/ProfileHeader';
import {AuthContext} from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Actionsheet, useDisclose} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PostContext} from '../context/PostContext';
import {ThemeContext} from '../context/ThemeContext';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const {currentUser, user, isGettingUser} = useContext(AuthContext);
  const {getUserPosts, userPosts, userPostsLoading, getUserRealTimePost} =
    useContext(PostContext);
  const {theme} = useContext(ThemeContext);
  const {onClose, isOpen, onOpen} = useDisclose();
  const [imageToUpload, setImageToUpload] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const width = Dimensions.get('screen').width;

  useEffect(() => {
    getUserPosts(user?.uid);
  }, [user?.uid]);

  useEffect(() => {
    getUserRealTimePost(user?.uid);
    // return () => getUserRealTimePost();
  }, []);

  const takePhotoWithCamera = async () => {
    try {
      onClose();
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      });
      if (result) {
        setImageToUpload(result.assets[0].uri);
        // uploadImage();
        await firestore()
          .collection('users')
          .doc(user?.uid)
          .update({
            profilePicture: await uploadImage(),
          });
      }
    } catch (error) {
      ToastAndroid.show('No image captured', ToastAndroid.SHORT);
    }
  };
  const selectPhotoFromGallery = async () => {
    try {
      onClose();
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.6,
      });
      if (result) {
        setImageToUpload(result.assets[0].uri);
        setIsUploading(true);
        await firestore()
          .collection('users')
          .doc(user?.uid)
          .update({
            profilePicture: await uploadImage(),
          });
        setIsUploading(false);
      }
    } catch (error) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
    }
  };

  const uploadImage = async () => {
    const uploadUri = imageToUpload;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    if (currentUser?.profilePicture !== '') {
      const imageRefToDelete = storage().refFromURL(
        currentUser?.profilePicture,
      );
      const toDeleteRef = storage().ref(imageRefToDelete.fullPath);
      await toDeleteRef.delete();
    }
    const storageRef = storage().ref(`profilePictures/${filename}`);
    await storageRef.putFile(imageToUpload);
    try {
      const url = await storageRef.getDownloadURL();
      return url.toString();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isGettingUser ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : (
        <>
          <Tabs.Container
            headerContainerStyle={{
              backgroundColor: theme === 'light' ? 'white' : 'black',
            }}
            renderHeader={() => (
              <ProfileHeader
                isUserProfile={true}
                isUploading={isUploading}
                currentUser={currentUser}
                changePhoto={onOpen}
                navigateToEditScreeen={() =>
                  navigation.navigate('EditProfile', {
                    username: currentUser?.username,
                    bio: currentUser?.bio,
                  })
                }
              />
            )}>
            <Tabs.Tab name="Posts">
              {userPostsLoading ? (
                <Tabs.ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    backgroundColor: theme === 'light' ? 'white' : 'black',
                  }}>
                  <View style={styles.loadingStyle}>
                    <ActivityIndicator color="blue" size="large" />
                  </View>
                </Tabs.ScrollView>
              ) : (
                <Tabs.FlatList
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
                        source={{uri: item?.postImage}}
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
                  style={{
                    backgroundColor: theme === 'light' ? 'white' : 'black',
                  }}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              )}
            </Tabs.Tab>
          </Tabs.Container>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content bg={theme === 'light' ? 'white' : 'black'}>
              <Actionsheet.Item
                fontSize={16}
                bg={theme === 'light' ? 'white' : 'black'}
                leftIcon={
                  <FontAwesome
                    name="camera"
                    size={20}
                    color={theme === 'light' ? 'black' : 'white'}
                  />
                }
                onPress={takePhotoWithCamera}>
                <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
                  Select from camera
                </Text>
              </Actionsheet.Item>
              <Actionsheet.Item
                fontSize={16}
                bg={theme === 'light' ? 'white' : 'black'}
                leftIcon={
                  <FontAwesome
                    name="photo"
                    size={20}
                    color={theme === 'light' ? 'black' : 'white'}
                  />
                }
                onPress={selectPhotoFromGallery}>
                <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
                  Select from media
                </Text>
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
});
export default ProfileScreen;
