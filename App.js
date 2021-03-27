import React from 'react';
import RecordYourself from './src/RecordYourself';
import Preview from './src/Preview';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
export default function App() {
  const Index=createStackNavigator();
  return(
    <NavigationContainer>
      <Index.Navigator>
        <Index.Screen name="recordyourself" component={RecordYourself} options={{headerShown: false}}/>
        <Index.Screen name="preview" component={Preview} options={{headerShown: false}}/>
      </Index.Navigator>
    </NavigationContainer>
  )
}
