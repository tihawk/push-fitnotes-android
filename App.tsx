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
import Element from './src/test';
import { CSVParser } from './src/csv-parser';
import FileSelect from './src/components/FileSelect';
import { WorkoutT } from './src/util/interfaces';
import WorkoutView from './src/components/WorkoutView';
import { setSetting } from './src/settings';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text>
        {title}
      </Text>
      <Text>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const theme = useTheme()
  const [workouts, setWorkouts] = useState<WorkoutT[]>([])
  return (
    <SafeAreaView>
      <StatusBar/>
      <FileSelect setWorkouts={setWorkouts}/>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.colors.background
        }}
        contentInsetAdjustmentBehavior="automatic"
        >
        <Header />
        <View>
          {workouts.map((wkout, i) => (
            <View key={i}>
              <WorkoutView workout={wkout} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
