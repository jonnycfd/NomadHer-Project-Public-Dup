import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import Video from 'react-native-video';
import {Constants} from 'expo'



export default class SampleImage extends React.Component {

  // async loginWithFacebook() {
  //   const url = 'http://192.168.0.19:80/api/test';

  //   var result = await fetch(url);
  // }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Sample Image</Text>

        <Image
          style={{width: "100%", height: "75%"}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
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