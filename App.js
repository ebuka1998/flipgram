import {View, StyleSheet} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import MainNav from './src/navigation/MainNav';
import {BottomSheetContextProvider} from './src/context/BottomSheetContext';
import {AuthContextProvider} from './src/context/AuthContext';
import {PostContextProvider} from './src/context/PostContext';
import {ThemeContextProvider} from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeContextProvider>
      <PostContextProvider>
        <BottomSheetContextProvider>
          <AuthContextProvider>
            <NativeBaseProvider>
              <View style={styles.container}>
                <MainNav />
              </View>
            </NativeBaseProvider>
          </AuthContextProvider>
        </BottomSheetContextProvider>
      </PostContextProvider>
    </ThemeContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
