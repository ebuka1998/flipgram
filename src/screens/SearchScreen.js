/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useContext, useState} from 'react';
import SearchHeader from '../components/SearchHeader';
import SearchUserCard from '../components/SearchUserCard';
import {AuthContext} from '../context/AuthContext';
import {ThemeContext} from '../context/ThemeContext';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = ({navigation}) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const getSearchedUsers = async () => {
    try {
      setLoading(true);
      const myLists = await firestore()
        .collection('users')
        .where('username', '>=', searchTerm)
        .get();
      setSearchedUsers(myLists.docs.map(doc => ({...doc.data(), id: doc.id})));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme === 'light' ? 'white' : 'black'},
      ]}>
      <SearchHeader
        textValue={searchTerm}
        changeText={text => setSearchTerm(text)}
        searchUser={() => getSearchedUsers()}
      />
      <View style={styles.sectionView}>
        {searchTerm === '' ? (
          <View style={styles.loadingStyle}>
            <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
              No user
            </Text>
          </View>
        ) : loading ? (
          <View style={styles.loadingStyle}>
            <ActivityIndicator color="blue" size="small" />
          </View>
        ) : (
          <FlatList
            data={searchedUsers}
            style={{marginBottom: 60}}
            showsVerticalScrollIndicator={false}
            key={'#'}
            renderItem={({item}) => {
              return (
                <SearchUserCard
                  user={item}
                  goToUserDetails={() =>
                    item.id === user.uid
                      ? null
                      : navigation.navigate('UserProfile', {
                          name: item.username,
                          userId: item.id,
                        })
                  }
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionView: {
    marginTop: 50,
  },
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default SearchScreen;
