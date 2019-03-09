import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'
import VideoComponent from './Video.js'

import CountDown from './feature_component/countdown.js'
import TakePhoto from './feature_component/TakePhoto.js'

function onFinish() {
  console.log("Finish!")
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Test, this is the login page.</Text>
        <CountDown initCount={5} passIn={onFinish}/>
        <TakePhoto />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
