/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Text, useTheme
} from 'react-native-paper'

import {
  Header,
} from 'react-native/Libraries/NewAppScreen';
import FileSelect from './src/components/FileSelect';
import { WorkoutT } from './src/util/interfaces';
import WorkoutView from './src/components/WorkoutView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsView from './src/components/SettingsView';
import CustomNavigationBar from './src/components/CustomNavigationBar';

const Stack = createNativeStackNavigator();

function HomeView() {
  const [workouts, setWorkouts] = useState<WorkoutT[]>([])
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Header />
        <View>
          {workouts.length ? workouts.map((wkout, i) => (
            <View key={`workout-${i}`}>
              <WorkoutView workout={wkout} />
            </View>
          )) : <FileSelect setWorkouts={setWorkouts}/>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function App(): JSX.Element {
  const theme = useTheme()
  return (
    <NavigationContainer
      // @ts-ignore
      theme={theme}
    >
      <Stack.Navigator
      initialRouteName='Home'
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}
      >
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Settings" component={SettingsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
