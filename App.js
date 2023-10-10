import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';
import IconButton from './components/UI/IconButton';
import { Colours } from './constants/colours';

const Stack = createNativeStackNavigator();

export default function App() {
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
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading...'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
