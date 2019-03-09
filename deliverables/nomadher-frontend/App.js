import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'
import VideoComponent from './Video.js'
import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5lrnpxS_2Kg__rx081B-uaXYLj_lgRG4",
  authDomain: "nomadherd2.firebaseapp.com",
  databaseURL: "https://nomadherd2.firebaseio.com",
  projectId: "nomadherd2",
  storageBucket: "nomadherd2.appspot.com",
};

firebase.initializeApp(firebaseConfig);

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

export default class App extends Component {

  componentDidMount() {

    firebase.auth().onAuthSateChanged((user) => {
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
