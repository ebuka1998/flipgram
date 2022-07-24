/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../context/ThemeContext';

const UserProfileHeader = ({navigateBack, headerText}) => {
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
            name="keyboard-backspace"
            size={25}
            color={theme === 'light' ? 'black' : 'white'}
            onPress={navigateBack}
          />
          <Text
            style={[
              styles.textStyle,
              {
                paddingLeft: 20,
                fontSize: 20,
                color: theme === 'light' ? 'black' : 'white',
              },
            ]}>
            {headerText}
          </Text>
        </View>
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
    fontSize: 16,
  },
});

export default UserProfileHeader;
