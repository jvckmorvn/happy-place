import { FlatList, View, Text, StyleSheet } from "react-native";

import PlaceItem from "./PlaceItem";
import { useNavigation } from '@react-navigation/native';

export default function PlacesList({places}) {
  const navigation = useNavigation();
  
  function selectPlaceHandler(place) {
    navigation.navigate('PlaceDetails', {place});
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet.</Text>
      </View>
    );
  }
  
  const keyExtractor = item => item.id;

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={keyExtractor}
      renderItem={({item}) => <PlaceItem place={{...item}} onSelect={selectPlaceHandler.bind(this, item)}/>}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 16
  }
});
