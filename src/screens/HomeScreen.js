/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import React, {useContext, useState} from 'react';
import PostCard from '../components/PostCard';
import CameraBottomSheet from '../components/CameraBottomSheet';
import {PostContext} from '../context/PostContext';
import {AuthContext} from '../context/AuthContext';
import {ThemeContext} from '../context/ThemeContext';

const HomeScreen = ({navigation}) => {
  const {loading, flipPosts, likePost} = useContext(PostContext);
  const {user} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      {loading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : (
        <FlatList
          data={flipPosts}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled={true}
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: theme === 'light' ? 'black' : 'white',
                  fontSize: 20,
                }}>
                No Posts!
              </Text>
            </View>
          }
          key={'#'}
          renderItem={({item}) => {
            return (
              <PostCard
                post={item}
                likePost={() =>
                  likePost(item.id, user.uid, item.usersThatLiked)
                }
                navigateToComments={() =>
                  navigation.navigate('Comments', {
                    postId: item.id,
                    description: item.description,
                  })
                }
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
      <CameraBottomSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
