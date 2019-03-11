import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Constants} from 'expo'




export default class Pending extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Your verification is under review.</Text>
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