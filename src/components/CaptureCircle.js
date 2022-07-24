/* eslint-disable prettier/prettier */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const CaptureCircle = ({takePicture}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={takePicture}
    />
  );
};

export default CaptureCircle;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    marginBottom: 40,
  },
});
