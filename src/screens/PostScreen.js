/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Image, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import ListImagesHeader from '../components/ListImagesHeader';
import {Input} from 'native-base';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {ThemeContext} from '../context/ThemeContext';

const PostScreen = ({navigation, route}) => {
  const {imageToPost} = route.params;
  const {currentUser, user} = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const {theme} = useContext(ThemeContext);

  const uploadImage = async () => {
    const uploadUri = imageToPost;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`posts/${filename}`);
    await storageRef.putFile(imageToPost);
    try {
      const url = await storageRef.getDownloadURL();
      console.log(url);
      return url.toString();
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    try {
      setLoading(true);
      await firestore()
        .collection('posts')
        .add({
          postImage: await uploadImage(),
          userId: user?.uid,
          userPosted: currentUser,
          description,
          likes: 0,
          usersThatLiked: [],
          comments: 0,
          timePosted: Date.now(),
        });
      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          posts: firestore.FieldValue.increment(1),
        });
      setLoading(false);
      navigation.navigate('Tabs');
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
      <ListImagesHeader
        headerText="Add Post"
        text="create"
        navigateBack={() => navigation.navigate('Tabs')}
        goToNextScreen={loading ? null : addPost}
      />
      <View style={styles.marginView}>
        <View>
          {loading ? (
            <Text
              style={{
                color: theme === 'light' ? 'black' : 'white',
                textAlign: 'center',
              }}>
              uploading...
            </Text>
          ) : (
            <Text>{''}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            variant="underlined"
            placeholder="Add description"
            w="70%"
            color={theme === 'light' ? 'black' : 'white'}
            multiline={true}
            value={description}
            onChangeText={text => setDescription(text)}
            borderColor={theme === 'light' ? 'black' : 'white'}
            selectionColor={theme === 'light' ? 'black' : 'white'}
            placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          />
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: imageToPost,
              }}
              resizeMode={'cover'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marginView: {
    marginTop: 60,
  },
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  imageView: {
    paddingLeft: 5,
  },
  image: {width: 100, height: 100},
});
export default PostScreen;
