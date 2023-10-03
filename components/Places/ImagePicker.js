import { Alert, View, Image, Text, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from "react";

import { Colours } from '../../constants/colours';
import OutlinedButton from "../UI/OutlinedButton";
import { verifyPermissions } from "../../util/permissions";

export default function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Error', 'Grant camera access to use this app.');
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{uri: pickedImage}} style={styles.image}/>;
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
