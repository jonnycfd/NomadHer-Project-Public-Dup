import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'
import VideoComponent from './Video.js'

export default class App extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      // <View style={styles.container}>
      //   <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Video Verification</Text>
      <VideoComponent />
      // </View>
      
    )
=======
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Test, this is the login page.</Text>
      </View>
    );
>>>>>>> 5b0390f089ae44bf03efec3efcce9668180aef3b
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
