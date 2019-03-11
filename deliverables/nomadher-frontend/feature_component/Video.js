import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Constants, Video} from 'expo'

export default class VideoComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Welcome to NoMadHer!</Text>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            shouldPlay
            resizeMode="cover"
            style={{ width:"100%", height: "75%" }}
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

