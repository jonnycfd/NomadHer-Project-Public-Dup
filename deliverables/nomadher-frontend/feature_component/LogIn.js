import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'
import VideoComponent from './feature_component/Video.js'
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';
import { Navigation } from 'react-native-navigation';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5lrnpxS_2Kg__rx081B-uaXYLj_lgRG4",
  authDomain: "nomadherd2.firebaseapp.com",
  databaseURL: "https://nomadherd2.firebaseio.com",
  projectId: "nomadherd2",
  storageBucket: "nomadherd2.appspot.com",
};

firebase.initializeApp(firebaseConfig);

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