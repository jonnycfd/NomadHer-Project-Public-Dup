import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Constants} from 'expo'
import {ImageBackground} from 'react-native';




export default class Pending extends React.Component {


  render() {
    return (

      <ImageBackground style={{width: '100%', height: '100%'}}
      resizeMode='cover' 
      source={require('../assets/pending.jpg')}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold', color:'green'}}>Your verification is under review</Text>
        </View>
      </ImageBackground>


    )
  }
}

const styles = StyleSheet.create({
  imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
}
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });