import { StatusBar } from 'expo-status-bar';
import { Navigation, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AllPlace from './screens/AllPlaces';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator>
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
          <Stack.Screen name='AllPlace' component={AllPlace}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
