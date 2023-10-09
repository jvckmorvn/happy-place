import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import IconButton from './components/UI/IconButton';
import { Colours } from './constants/colours';
import { init } from './util/database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialised, setDbInitialised] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialised(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  if (!dbInitialised) {
    return <AppLoading/>
  }

  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colours.primary700
            },
            headerTintColor: Colours.grey700,
            contentStyle: {
              backgroundColor: Colours.primary50
            }
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'My Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon='add'
                  size={24}
                  colour={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}/>
              )
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add Place'
            }}
          />
          <Stack.Screen
            name='Map'
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
