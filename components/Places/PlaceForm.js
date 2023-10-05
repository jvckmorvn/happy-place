import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { useCallback, useState } from "react";

import { Colours } from "../../constants/colours";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {}

  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            onChangeText={changeTitleHandler}
            value={enteredTitle}
            style={styles.input}
          />
        </View>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  )
}

const styles= StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colours.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colours.primary500,
    borderBottomWidth: 2,
    backgroundColor: Colours.primary100
  }
});
