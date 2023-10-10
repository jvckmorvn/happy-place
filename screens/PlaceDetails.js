import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

import OutlinedButton from "../components/UI/OutlinedButton";
import { Colours } from "../constants/colours";

export default function PlaceDetails({route, navigation}) { 
  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: selectedPlace.location.lat,
      initialLong: selectedPlace.location.long
    });
  }

  const selectedPlace = route.params.place;

  useEffect(() => {
    navigation.setOptions({
      title: selectedPlace.title
    });
  }, [selectedPlace]);

  if (!selectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedPlace.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>View on map</OutlinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colours.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});
