import { useState } from "react";
import { StyleSheet, View, Alert, Image, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions } from 'expo-location';
import { PermissionStatus } from 'expo-image-picker';

import OutlinedButton from "../UI/OutlinedButton";
import { Colours } from "../../constants/colours";
import { verifyPermissions } from "../../util/permissions";
import { getMapPreview } from "../../util/location";

export default function LocationPicker() {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  async function verifyPermissions () {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Error', 'Enable location permissions to use this app.');
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude
    });
  }

  function pickOnMapHandler() {}

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.long)}}/>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
