/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AdenCompat,
  _1977Compat,
  BrannanCompat,
  BrooklynCompat,
  ClarendonCompat,
  EarlybirdCompat,
  GinghamCompat,
  HudsonCompat,
  InkwellCompat,
  KelvinCompat,
  LarkCompat,
  LofiCompat,
  MavenCompat,
  MayfairCompat,
  MoonCompat,
  NashvilleCompat,
  PerpetuaCompat,
  ReyesCompat,
  RiseCompat,
  SlumberCompat,
  StinsonCompat,
  ToasterCompat,
  ValenciaCompat,
  WaldenCompat,
  WillowCompat,
  Xpro2Compat,
} from 'react-native-image-filter-kit';
import ListImagesHeader from '../components/ListImagesHeader';
import {ThemeContext} from '../context/ThemeContext';

const FILTERS = [
  {
    title: 'Normal',
    filterComponent: AdenCompat,
  },
  {
    title: 'Maven',
    filterComponent: MavenCompat,
  },
  {
    title: 'Mayfair',
    filterComponent: MayfairCompat,
  },
  {
    title: 'Moon',
    filterComponent: MoonCompat,
  },
  {
    title: 'Nashville',
    filterComponent: NashvilleCompat,
  },
  {
    title: 'Perpetua',
    filterComponent: PerpetuaCompat,
  },
  {
    title: 'Reyes',
    filterComponent: ReyesCompat,
  },
  {
    title: 'Rise',
    filterComponent: RiseCompat,
  },
  {
    title: 'Slumber',
    filterComponent: SlumberCompat,
  },
  {
    title: 'Stinson',
    filterComponent: StinsonCompat,
  },
  {
    title: 'Brooklyn',
    filterComponent: BrooklynCompat,
  },
  {
    title: 'Earlybird',
    filterComponent: EarlybirdCompat,
  },
  {
    title: 'Clarendon',
    filterComponent: ClarendonCompat,
  },
  {
    title: 'Gingham',
    filterComponent: GinghamCompat,
  },
  {
    title: 'Hudson',
    filterComponent: HudsonCompat,
  },
  {
    title: 'Inkwell',
    filterComponent: InkwellCompat,
  },
  {
    title: 'Kelvin',
    filterComponent: KelvinCompat,
  },
  {
    title: 'Lark',
    filterComponent: LarkCompat,
  },
  {
    title: 'Lofi',
    filterComponent: LofiCompat,
  },
  {
    title: 'Toaster',
    filterComponent: ToasterCompat,
  },
  {
    title: 'Valencia',
    filterComponent: ValenciaCompat,
  },
  {
    title: 'Walden',
    filterComponent: WaldenCompat,
  },
  {
    title: 'Willow',
    filterComponent: WillowCompat,
  },
  {
    title: 'Xpro2',
    filterComponent: Xpro2Compat,
  },
  {
    title: 'Aden',
    filterComponent: AdenCompat,
  },
  {
    title: '_1977',
    filterComponent: _1977Compat,
  },
  {
    title: 'Brannan',
    filterComponent: BrannanCompat,
  },
];

const EditingScreen = ({navigation, route}) => {
  const {selectedImage} = route.params;
  const extractedUri = useRef(selectedImage);
  const {theme} = useContext(ThemeContext);
  const [selectedFilterIndex, setIndex] = useState(0);
  const onExtractImage = ({nativeEvent}) => {
    extractedUri.current = nativeEvent.uri;
  };
  const onSelectFilter = selectedIndex => {
    setIndex(selectedIndex);
  };

  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{
          uri: selectedImage,
        }}
        resizeMode={'cover'}
      />
    );
    return (
      <TouchableOpacity
        onPress={() => onSelectFilter(index)}
        activeOpacity={0.9}>
        <Text
          style={[
            styles.filterTitle,
            {color: theme === 'light' ? 'black' : 'white'},
          ]}>
          {item.title}
        </Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };
  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;
  return (
    <View
      style={{flex: 1, backgroundColor: theme === 'light' ? 'white' : 'black'}}>
      <SafeAreaView />
      <ListImagesHeader
        navigateBack={() => navigation.goBack()}
        text="next"
        headerText="EditImage"
        goToNextScreen={() =>
          navigation.navigate('Post', {imageToPost: extractedUri.current})
        }
      />
      {selectedFilterIndex === 0 ? (
        <Image
          style={styles.image}
          source={{
            uri: selectedImage,
          }}
          resizeMode={'contain'}
        />
      ) : (
        <SelectedFilterComponent
          onExtractImage={onExtractImage}
          extractImageEnabled={true}
          image={
            <Image
              style={styles.image}
              source={{
                uri: selectedImage,
              }}
              resizeMode={'cover'}
            />
          }
        />
      )}
      <FlatList
        style={styles.flatlist}
        data={FILTERS}
        keyExtractor={item => item.title}
        horizontal={true}
        renderItem={renderFilterComponent}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
    marginVertical: 10,
    // alignSelf: 'center',
  },
  filterSelector: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 5,
    marginTop: 10,
  },
  flatlist: {marginTop: 5},
});
export default EditingScreen;
