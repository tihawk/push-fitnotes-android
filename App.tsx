/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.colors.background
        }}
        contentInsetAdjustmentBehavior="automatic"
        >
        <Header />
        <View>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((el) => (
            <View key={el} style={styles.sectionContainer}>
              <Element></Element>
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
