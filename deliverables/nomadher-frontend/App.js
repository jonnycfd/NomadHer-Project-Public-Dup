import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
// import {Constants, Video} from 'expo'
// import VideoComponent from './feature_component/Video.js'
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
// import * as firebase from 'firebase';
import Login from './feature_component/Login.js'
// import { Navigation } from 'react-native-navigation';

/*
export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Video Verification</Text>
      <VideoComponent />
      // </View>
      
    )
  }
}
*/

export default class App extends React.Component {
  render() {
    return (
      <Login />
    );
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
