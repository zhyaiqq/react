import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackScreenProps, StackHeaderLeftButtonProps } from '@react-navigation/stack';

import HomeScreen from '../screens/Home'
import DetailScreen from '../screens/Detail'
import HooksDep from '../screens/HooksDep'
import { RootStackList } from './type';


const Stack = createStackNavigator<RootStackList>();

const options: StackNavigationOptions = {
  headerShown: true,
  headerTintColor: 'white',
  headerStyle: { backgroundColor: 'tomato' },
  headerLeft: () => {
    console.log('11');
    return <Button title="返回" onPress={() => {}}/>
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} initialParams={{ id: '123' }}/>
        <Stack.Screen name="Hooks" component={HooksDep} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;