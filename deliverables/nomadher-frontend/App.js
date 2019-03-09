import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'
import VideoComponent from './feature_component/Video.js'
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';
import { Navigation } from 'react-native-navigation';

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

export default class LogIn extends React.Component {

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  async loginWithFacebook() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('2214679281946238', {permissions:['public_profile']})

    if (type == 'success'){
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) =>{
        console.log(error)
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Button style={{mariginTop:10}}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
              <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>

        </Form>
      
      </Container>
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
