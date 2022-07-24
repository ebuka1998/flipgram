/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../context/ThemeContext';

const ListImagesHeader = ({navigateBack, text, headerText, goToNextScreen}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      <View style={styles.contentContainer}>
        <View style={styles.flexContainer}>
          <MaterialCommunityIcons
            name="close"
            size={25}
            color={theme === 'light' ? 'black' : 'white'}
            onPress={navigateBack}
          />
          <Text style={[styles.textStyle, {paddingLeft: 20, fontSize: 20}]}>
            {headerText}
          </Text>
        </View>
        <TouchableOpacity onPress={goToNextScreen}>
          <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    height: 60,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textStyle: {
    color: '#2a52be',
    fontSize: 18,
  },
});
export default ListImagesHeader;
