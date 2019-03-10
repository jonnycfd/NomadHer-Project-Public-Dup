import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Video from 'react-native-video';
import VideoComponent from './Video.js'
import {Constants, Video} from 'expo'

export default class Hello extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Hello</Text>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'bold'}}> Please finish the video verification</Text>    
        <Button title="verification"
          onPress={() => this.props.navigation.navigate('VideoComponent')}
        />
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