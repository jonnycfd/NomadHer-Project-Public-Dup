import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import { SocialIcon } from 'react-native-elements'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5lrnpxS_2Kg__rx081B-uaXYLj_lgRG4",
  authDomain: "nomadherd2.firebaseapp.com",
  databaseURL: "https://nomadherd2.firebaseio.com",
  projectId: "nomadherd2",
  storageBucket: "nomadherd2.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// function postUID() {
//   const url = "0.0.0.0/api/login";
//   let data = {
//     "uid": user.providerData[0].uid
//   }
//   const request = new Request(url, {
//     method: 'post',
//     body: JSON.stringify(data),
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json'
//     },
//   });

//   fetch(request)
//     .then((res) => {
//       console.log('Success')
//       return res.json()
//     })
//     .then((jsonResult) => {
//       console.log('Result:', jsonResult)
//     }).catch((error) => {
//       console.log("An error occured with fetch:", error)
//     })
// }


export default class Login extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.providerData[0].uid)
      }
    })
  }


  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
      ('2214679281946238', { permissions: ['public_profile'] })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      // this.postUID();
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <SocialIcon
          title='Login With Facebook'
          button
          type='facebook'
          full
          onPress={() => this.loginWithFacebook()}
        />
      </View>


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
