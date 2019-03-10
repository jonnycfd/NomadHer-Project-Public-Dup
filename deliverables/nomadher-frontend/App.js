import React from 'react';
import TakePhoto from './feature_component/TakePhoto.js'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {Constants, Video} from 'expo'
// import VideoComponent from './feature_component/Video.js'
// import Login from './feature_component/Login.js'
import CountDown from './feature_component/countdown.js'
// import Hello from './feature_component/hello.js'
// import SampleImage from './feature_component/image.js'
import { Navigation } from 'react-native-navigation';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import * as firebase from 'firebase';
import { SocialIcon } from 'react-native-elements'



export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
        // <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Video Verification</Text>
        // <VideoComponent />
        
      // </View>
      // <CountDown />
      // <SampleImage />
      // <View style={styles.container}>
      // <Hello />
      // </View>
      // <Button title="verification"
          // onPress={() => this.props.navigation.navigate('sampleimage')}
      // />

      <AppContainer />
      
    )
      
  }
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5lrnpxS_2Kg__rx081B-uaXYLj_lgRG4",
  authDomain: "nomadherd2.firebaseapp.com",
  databaseURL: "https://nomadherd2.firebaseio.com",
  projectId: "nomadherd2",
  storageBucket: "nomadherd2.appspot.com",
};

firebase.initializeApp(firebaseConfig);

class Login extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user.providerData[0].uid)
        // this.props.navigation.navigate('hello')
        // console.log("11111111111")
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

class Hello extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Hello</Text>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'bold'}}> Please finish the video verification</Text> 
        <Button title="verification"
          onPress={() => this.props.navigation.navigate('sampleimage')}
      />   
      </View>
    )
  }
}


class SampleImage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "",
    };
  }

  componentDidMount() {
    fetch('http://100.64.89.154:80/api/test') //地址更具实际情况更改
      .then(response => response.json())
      .then(data => this.setState({ image: data.image_uri }));
  }


  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Sample Image</Text>

        <Image
          style={{width: "100%", height: "75%"}}
          source={{uri: image}}
        />
        
      </View>
    )
//     setTimeout(() => {
//     this.props.navigation.navigate('hello'); //this.props.navigation.navigate('Login')
// }, 500); 
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login:{screen: Login},
  hello:{screen: Hello},
  countdown:{screen: CountDown},
  sampleimage:{screen: SampleImage}
});

const AppContainer = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 140,
	}
});
