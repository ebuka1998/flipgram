/* eslint-disable prettier/prettier */
import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectedPhoto = ({navigation, route}) => {
  const {selectedImage} = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={{uri: selectedImage}}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={styles.leftPosition}>
        <MaterialCommunityIcons
          name="close"
          size={50}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.rightPosition}>
        <MaterialCommunityIcons
          name="arrow-right-thick"
          size={50}
          color="white"
          onPress={() => {
            navigation.navigate('EditImage', {
              imageToEdit: selectedImage,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  leftPosition: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  rightPosition: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});

export default SelectedPhoto;
