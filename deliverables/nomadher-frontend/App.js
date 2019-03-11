import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {Constants, Video} from 'expo'
import VideoComponent from './feature_component/Video.js'
// import Login from './feature_component/Login.js'
import CountDown from './feature_component/countdown.js'
import TakePhoto from "./feature_component/TakePhoto.js"
import Pending from "./feature_component/pending.js"
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
      <AppContainer />      
    )
      
  }
}

const AppID = '2214679281946238';

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

  constructor(props) {
    super(props);

    this.state= {
      logInStatus: 'signed out'
    };
  }

  componentDidUpdate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        const url = "https://team5-nomadher-api.herokuapp.com/api/login";
        let data = {
          "user_id": user.providerData[0].uid
        }

        const request = new Request(url, {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
        });

        // POST user id to server
        fetch(request)
          .then((res) => {
            return res.json()
          })
          .then((jsonResult) => {
            // when the user does not do the verification 
            if (jsonResult.verified.status == 'False'){
              this.props.navigation.navigate('hello')

            }

            // when this user already finished verification
            else if (jsonResult.verified.status == 'True'){
              this.props.navigation.navigate('welcome')
            }

            // when this user's verification is under review
            else {
              this.props.navigation.navigate('pending')
            }
          }).catch((error) => {
            console.log("An error occured with fetch:", error)
          })
      } 
    })
  }

  // Login with Facebook
  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
      (AppID, { permissions: ['public_profile'] })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      this.setState({logInStatus: 'signed in'})

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



// =================================Hello page===============================
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

// =============================Display the sampe image===========================
// In this page, there will be three-second countdown, and after the count down, the camera 
// will automatically take a photo.
class SampleImage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "",
    };
  }

  componentDidMount() {
    fetch('http://100.64.89.154:80/api/test') 
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

        <Button title="take photo"
          onPress={() => this.props.navigation.navigate('takePhotoCountDown')}
        />
        
      </View>
    )
  }
}


// ===============================Take photo page============================
// in this page, the user will be displayed with the photo that he took
class TakePhotoCountDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      takePhoto: false,
      image_uri: "",
    }
  }
  
  // Call this function when the countdown is finish.
  onFinish = () => {
    this.setState({takePhoto: true})
  }

  // Call this function after you got the photo.
  processImg = img => {
    this.state.image_uri = img.base64
    this.setState({takePhoto: false})
    this.props.navigation.navigate('photo',{imageData:img.base64})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test, this is the login page.</Text>
        <CountDown initCount={3} passIn={this.onFinish} />
        <TakePhoto takePhoto={this.state.takePhoto} process={this.processImg} />
        
      </View>
    )
  }
}


//============================== display your photo===============================
class Photo extends React.Component {

  render() {
    const imageData = this.props.navigation.getParam('imageData','No_image_data')
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Your Photo</Text>

        <Image
          style={{width: "100%", height: "75%"}}
          source={{uri: 'data:image/png;base64,' + imageData}}
        />

        <Button title="Next"
          onPress={() => this.props.navigation.navigate('pending')}
        />
        
      </View>
    )
  }
}


// =========================navigation module for screen change=======================
const AppSwitchNavigator = createSwitchNavigator({
  Login:{screen: Login},
  hello:{screen: Hello},
  countdown:{screen: CountDown},
  sampleimage:{screen: SampleImage},
  takePhotoCountDown:{screen: TakePhotoCountDown},
  welcome:{screen:VideoComponent},
  pending:{screen:Pending},
  photo:{screen:Photo}
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
