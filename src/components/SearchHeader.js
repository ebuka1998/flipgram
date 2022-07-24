/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {HStack, Input} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../context/ThemeContext';

const SearchHeader = ({textValue, changeText, searchUser}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      <HStack justifyContent="center" alignItems="center" h="100%">
        <Input
          w={'75%'}
          h={'70%'}
          value={textValue}
          onChangeText={changeText}
          onChange={searchUser}
          onSubmitEditing={searchUser}
          InputRightElement={
            <FontAwesome
              name="search"
              size={20}
              color={theme === 'light' ? 'black' : 'white'}
              style={{paddingRight: 5}}
              onPress={searchUser}
            />
          }
          returnKeyType="search"
          placeholder="Password"
          borderColor={theme === 'light' ? 'black' : 'white'}
          color={theme === 'light' ? 'black' : 'white'}
          selectionColor={theme === 'light' ? 'black' : 'white'}
        />
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0,
  },
});
export default SearchHeader;
