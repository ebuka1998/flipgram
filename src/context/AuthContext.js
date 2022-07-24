/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isGettingUser, setIsGettingUser] = useState(false);

  function onAuthStateChanged(current) {
    setUser(current);
    // console.log(user?.uid);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    try {
      setIsGettingUser(true);
      const userToAdd = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();
      setCurrentUser(userToAdd.data());
      setIsGettingUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot => {
        setCurrentUser(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [user?.uid]);

  const logUserOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        isGettingUser,
        initializing,
        logUserOut,
      }}>
      <>{props.children}</>
    </AuthContext.Provider>
  );
};
