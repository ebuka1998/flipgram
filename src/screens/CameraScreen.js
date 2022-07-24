/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
// import {useCameraDevices, Camera} from 'react-native-vision-camera';
import CaptureCircle from '../components/CaptureCircle';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const CameraScreen = () => {
  // const getPermissions = async () => {
  //   try {
  //     await Camera.getCameraPermissionStatus();
  //     await Camera.getMicrophonePermissionStatus();

  //     await Camera.requestCameraPermission();
  //     await Camera.requestMicrophonePermission();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [isFrontOrBack, setIsFrontOrBack] = useState(false);
  // const [isFlash, setIsFlash] = useState(false);
  // const [takenPhoto, setTakenPhoto] = useState('');
  // const devices = useCameraDevices();
  // const device = !isFrontOrBack ? devices.front : devices.back;
  // const navigation = useNavigation();
  // const isFocused = useIsFocused();
  // const camera = useRef(null);

  // useEffect(() => {
  //   getPermissions();
  // }, []);

  // const takePicture = async () => {
  //   try {
  //     const photo = await camera.current.takeSnapshot({
  //       flash: isFlash && device.hasFlash ? 'on' : 'off',
  //     });
  //     setTakenPhoto(photo.path);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if (device == null) return <Text>loading...</Text>;
  return (
    <View style={styles.container}>
      {/* {takenPhoto.length > 0 ? (
        <>
          <Image
            source={{uri: `file://${takenPhoto}`}}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
          <View style={{position: 'absolute', top: 20, left: 10}}>
            <MaterialCommunityIcons
              name="close"
              size={50}
              color="white"
              onPress={() => setTakenPhoto('')}
            />
          </View>
          <View style={{position: 'absolute', top: 20, right: 10}}>
            <MaterialCommunityIcons
              name="arrow-right-thick"
              size={50}
              color="white"
              onPress={() => {
                navigation.navigate('EditImage', {
                  imageToEdit: `file://${takenPhoto}`,
                });
                setTakenPhoto('');
              }}
            />
          </View>
        </>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isFocused}
            enableZoomGesture={true}
            ref={camera}
            photo={true}
            focusable={true}
            preset="hd-1280x720"
            orientation="landscapeRight"
          />
          <View style={{position: 'absolute', top: 20, left: 10}}>
            <MaterialCommunityIcons
              name="close"
              size={50}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{position: 'absolute', top: 100, right: 10}}>
            <MaterialCommunityIcons
              name="camera-flip"
              size={40}
              color="white"
              onPress={() => setIsFrontOrBack(!isFrontOrBack)}
            />
            <MaterialCommunityIcons
              name={isFlash ? 'flash' : 'flash-off'}
              size={40}
              color="white"
              style={{marginTop: 20}}
              onPress={() => setIsFlash(!isFlash)}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <CaptureCircle takePicture={() => takePicture()} />
            </View>
            <View style={styles.galleryImageView}>
              <Entypo
                name="image"
                size={40}
                color="white"
                onPress={() => navigation.navigate('ListImage')}
              />
            </View>
          </View>
        </>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    width: '100%',
    height: 100,
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
  },
  galleryImageView: {
    position: 'absolute',
    left: 80,
    bottom: 50,
  },
  galleryFlipImageView: {
    position: 'absolute',
    right: 80,
    bottom: 50,
  },
});
export default CameraScreen;
