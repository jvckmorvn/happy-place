import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Colours } from "../../constants/colours";
import ImagePicker from "./ImagePicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('');

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
        <ImagePicker/>
      </View>
    </ScrollView>
  )
}

const styles= StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
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
