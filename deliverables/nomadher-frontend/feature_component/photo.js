import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import Video from 'react-native-video';
import {Constants} from 'expo'



export default class Photo extends React.Component {

  render() {
  	const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Your Photo</Text>

        <Image
          style={{width: "100%", height: "75%"}}
          source={{uri: image}}
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


