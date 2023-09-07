import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import SplashScreen from '../../components/common/SplashScreen';
import { Stack } from 'expo-router';

export default function About() {
  return (
    <View  style={styles.container}>
       <Stack.Screen options={{ title: "About"}}/>
      <WebView
        source={{ uri: 'https://almubarakwaqf.org/about-us' }}
        startInLoadingState={true}
        renderLoading={() => <SplashScreen flex={1} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10
    // marginTop: Constants.statusBarHeight,
  },
});
