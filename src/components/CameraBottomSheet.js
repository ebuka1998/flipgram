/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Actionsheet} from 'native-base';
import {BottoSheetContext} from '../context/BottomSheetContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ThemeContext} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {Text, ToastAndroid} from 'react-native';

const CameraBottomSheet = () => {
  const {isOpen, onClose} = useContext(BottoSheetContext);
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const takePhotoWithCamera = async () => {
    try {
      onClose();
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      });
      console.log(result.assets[0].uri);
      navigation.navigate('EditImage', {selectedImage: result.assets[0].uri});
    } catch (error) {
      ToastAndroid.show('No image captured', ToastAndroid.SHORT);
    }
  };

  const selectPhotoFromGallery = async () => {
    try {
      onClose();
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      // console.log(result);
      navigation.navigate('EditImage', {selectedImage: result.assets[0].uri});
    } catch (error) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bg={theme === 'light' ? 'white' : 'black'}>
        <Actionsheet.Item
          bg={theme === 'light' ? 'white' : 'black'}
          fontSize={16}
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
          bg={theme === 'light' ? 'white' : 'black'}
          fontSize={16}
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
  );
};

export default CameraBottomSheet;
