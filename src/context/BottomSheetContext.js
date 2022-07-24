/* eslint-disable prettier/prettier */
import React, {createContext} from 'react';
import {useDisclose} from 'native-base';

export const BottoSheetContext = createContext();

export const BottomSheetContextProvider = ({children}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <BottoSheetContext.Provider value={{isOpen, onOpen, onClose}}>
      <>{children}</>
    </BottoSheetContext.Provider>
  );
};
