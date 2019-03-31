import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Constants, Video } from 'expo'
import VideoComponent from './feature_component/Video.js'
// import Login from './feature_component/Login.js'
import CountDown from './feature_component/countdown.js'
import TakePhoto from "./feature_component/TakePhoto.js"
import Pending from "./feature_component/pending.js"
// import Hello from './feature_component/hello.js'
// import SampleImage from './feature_component/image.js'
import { Navigation } from 'react-native-navigation';
import { ImageBackground } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import * as firebase from 'firebase';
import { Google } from 'expo';
import { SocialIcon } from 'react-native-elements'


export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
      // <Pending />
    )

  }
}

// Facebook developer App ID
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

// Store the user id.
var user_id;
var pose_id;

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
        // Update Global variable.
        user_id = data.user_id

        const request = new Request(url, {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
        });

        // POST user id to server, and receive user status
        fetch(request)
          .then((res) => {
            return res.json()
          })
          .then((jsonResult) => {
            // when the user does not do the verification 
            if (jsonResult.verified.status == 'False') {
              this.props.navigation.navigate('hello')

            }

            // when this user already finished verification
            else if (jsonResult.verified.status == 'True') {
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

      this.setState({ logInStatus: 'signed in' })

      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <ImageBackground style={{width: '100%', height: '100%'}}
      resizeMode='cover' 
      opacity={0.9}
      source={require('./assets/login2.jpg')}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{position: 'absolute', top: 130, left: 85,
        fontStyle: 'italic',
        fontSize: 50, fontWeight:'bold', color:'cadetblue', 
        fontFamily: 'notoserif',textShadowColor:'yellow', 
        includeFontPadding:true}}>NoMadHer</Text>
          <SocialIcon
            title='  Login With Facebook  '
            button
            type='facebook'
            full
            reverse
            onPress={() => this.loginWithFacebook()}
          />

          <SocialIcon
            title='  Login/Sign up With Email  '
            button
            type='envelope'
            full
            reverse
            onPress={() => this.props.navigation.navigate('emailLogin')}
          />
      </View>
      </ImageBackground>



    );
  }
}

class emailLogin extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  async signUpUser(email, password) {
    try {
      if (this.state.password.length < 8) {
        alert("Password must be at least 8 character.")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        alert('Account successfully create! Please login!')
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });

    }
    catch (error) {
      console.log(error.toString())
    }

  }

  async logInUser(email, password, emailLoginThis) {
    try {
      var hasError = 0;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage)
        hasError = 1;

      }).then(function (user) {
        if (hasError === 0) {

          const url = "https://team5-nomadher-api.herokuapp.com/api/login";
          let data = {
            "user_id": user.user.email
          }
          // Update the glabal variable.
          user_id = data.user_id

          console.log(data)
          const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
          });

          // POST user id to server and receive user status
          fetch(request)
            .then((res) => {
              return res.json()
            })
            .then((jsonResult) => {
              // when the user does not do the verification 
              if (jsonResult.verified.status == 'False') {
                emailLoginThis.props.navigation.navigate('hello')

              }

              // when this user already finished verification
              else if (jsonResult.verified.status == 'True') {
                emailLoginThis.props.navigation.navigate('welcome')
              }

              // when this user's verification is under review
              else {
                emailLoginThis.props.navigation.navigate('pending')
              }
            }).catch((error) => {
              console.log("An error occured with fetch:", error)
            })

        }
      })
    }
    catch (error) {
      console.log(error.toString())
    }
  }


  render() {
    return (
      // <ImageBackground style={{width: '100%', height: '100%'}}
      // resizeMode='cover' 
      // opacity={0.6}
      // source={require('./assets/email.jpg')}>
      //   <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Container style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor:'#ECE6FA'
        }}>
          <Form>

            <Item floatingLabel style={{ marginTop: 50 }}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>


            <Item floatingLabel style={{ marginBottom: 50 }}>
              <Label textColor='black'>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}

              />
            </Item>


            <Button

              // variant = 'dark'
              title='Login'
              color='#0693E3'
              onPress={() => this.logInUser(this.state.email, this.state.password, this)}
            >

            </Button>


            <Button style={{ marginTop: 30 }}
              rounded
              full
              title='Sign Up'
              color='#4CAF50'
              onPress={() => this.signUpUser(this.state.email, this.state.password)}
            >
            </Button>
          </Form>

        
        </Container>
      //   </View>
      // </ImageBackground>

    )
  }




}

// =================================Hello page===============================
class Hello extends React.Component {
  render() {
    return (
      <ImageBackground style={{ width: '100%', height: '100%' }}
        opacity={0.9}
        source={require('./assets/hello.jpg')}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: 'white' }}> Hello</Text>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white' }}> Please finish the verification</Text>
          <Button title="verification"
            onPress={() => this.props.navigation.navigate('takePhotoCountDown0')}
          />
        </View>
      </ImageBackground>
    )
  }

}

// =============================Display the sampe image===========================
// In this page, there will be three-second countdown, and after the count down, the camera 
// will automatically take a photo.
class SampleImage1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "placeholder"
    };

    

  }

  componentDidMount() {
    fetch(`https://team5-nomadher-api.herokuapp.com/api/get_pose/${user_id}`)
      .then(response => response.json())
      .then((data) => {
        pose_id = data.original_pose_id
        this.setState({ image: data.image_uri })
        console.log("testttttttttt", pose_id)
      });
  }


  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Sample Image1</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: image }}
        />

        <Button title="take photo"
          onPress={() => this.props.navigation.navigate('takePhotoCountDown1', {pose_id: this.state.pose_id})}
        />

      </View>
    )
  }
}


class SampleImage2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "placeholder"
    };
  }

  componentDidMount() {
    fetch(`https://team5-nomadher-api.herokuapp.com/api/get_pose/${user_id}`)
      .then(response => response.json())
      .then((data) => {
        pose_id = data.original_pose_id
        this.setState({ image: data.image_uri })
        console.log("testttttttttt", pose_id)
      });
  }


  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Sample Image2</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: image }}
        />

        <Button title="take photo"
          onPress={() => this.props.navigation.navigate('takePhotoCountDown2', {pose_id: this.state.pose_id})}
        />

      </View>
    )
  }
}

class SampleImage3 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "placeholder"
    };
  }

  componentDidMount() {
    fetch(`https://team5-nomadher-api.herokuapp.com/api/get_pose/${user_id}`)
      .then(response => response.json())
      .then((data) => {
        pose_id = data.original_pose_id
        this.setState({ image: data.image_uri })
        console.log("testttttttttt", pose_id)
      });
  }


  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Sample Image3</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: image }}
        />

        <Button title="take photo"
          onPress={() => this.props.navigation.navigate('takePhotoCountDown3', {pose_id: this.state.pose_id})}
        />

      </View>
    )
  }
}

// ===============================Take photo page============================
// in this page, the user will be displayed with the photo that he took
class TakePhotoCountDown0 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      takePhoto: false,
      image_uri: "",
    }
  }

  // Call this function when the countdown is finish.
  onFinish = () => {
    this.setState({ takePhoto: true })
  }

  // Call this function after you got the photo.
  processImg = img => {
    this.state.image_uri = img.base64
    this.setState({ takePhoto: false })
    sendPhoto(this.state.image_uri, -1)
    this.props.navigation.navigate('photo0', { imageData: img.base64 })
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Pleas take the photo of your ID in 10 seconds.</Text>
        <CountDown initCount={10} passIn={this.onFinish} />
        <TakePhoto takePhoto={this.state.takePhoto} process={this.processImg} />

      </View>
    )
  }
}

class TakePhotoCountDown1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      takePhoto: false,
      image_uri: "",
    }
  }

  // Call this function when the countdown is finish.
  onFinish = () => {
    this.setState({ takePhoto: true })
  }

  // Call this function after you got the photo.
  processImg = img => {
    this.state.image_uri = img.base64
    this.setState({ takePhoto: false })
    console.log(pose_id);
    sendPhoto(this.state.image_uri, pose_id)
    this.props.navigation.navigate('photo1', { imageData: img.base64 })
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>The photo will be taken in 3 seconds.</Text>
        <CountDown initCount={3} passIn={this.onFinish} />
        <TakePhoto takePhoto={this.state.takePhoto} process={this.processImg} />

      </View>
    )
  }
}

class TakePhotoCountDown2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      takePhoto: false,
      image_uri: "",
    }
  }

  // Call this function when the countdown is finish.
  onFinish = () => {
    this.setState({ takePhoto: true })
  }

  // Call this function after you got the photo.
  processImg = img => {
    this.state.image_uri = img.base64
    this.setState({ takePhoto: false })
    sendPhoto(this.state.image_uri, pose_id)
    this.props.navigation.navigate('photo2', { imageData: img.base64 })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>The photo will be taken in 3 seconds.</Text>
        <CountDown initCount={3} passIn={this.onFinish} />
        <TakePhoto takePhoto={this.state.takePhoto} process={this.processImg} />

      </View>
    )
  }
}


class TakePhotoCountDown3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      takePhoto: false,
      image_uri: "",
    }
  }

  // Call this function when the countdown is finish.
  onFinish = () => {
    this.setState({ takePhoto: true })
  }

  // Call this function after you got the photo.
  processImg = img => {
    this.state.image_uri = img.base64
    this.setState({ takePhoto: false })
    sendPhoto(this.state.image_uri, pose_id)
    this.props.navigation.navigate('photo3', { imageData: img.base64 })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>The photo will be taken in 3 seconds.</Text>
        <CountDown initCount={3} passIn={this.onFinish} />
        <TakePhoto takePhoto={this.state.takePhoto} process={this.processImg} />

      </View>
    )
  }
}

// This function is used to pass the given img to the give uri by POST request.
function sendPhoto(img, id) {
  var url
  var data

  if (id == -1) {
    url = 'https://team5-nomadher-api.herokuapp.com/api/post_photo_id'
    data = {
      "user_id": user_id,
      "photo_id_uri": 'data:image/png;base64,' + img,
    }
  } else {
    url = 'https://team5-nomadher-api.herokuapp.com/api/post_poses'
    data = {
      "user_id": user_id,
      "user_uploaded_img": 'data:image/png;base64,' + img,
      "original_pose_id": id,
    }
  } 

  const request = new Request(url, {
    method: 'post',
    body:JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  // Send the request.
  fetch(request)
    .then((res) => {
      console.log('Image sent')
      return res.json()
    })
    .then((jsonResult) => {
      console.log(jsonResult)
    }).catch((error) => {
      console.log("An error occured with sending image", error)
    })
}

//============================== display your photo===============================
class Photo0 extends React.Component {

  render() {
    const imageData = this.props.navigation.getParam('imageData', 'No_image_data')
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Your ID Photo</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: 'data:image/png;base64,' + imageData }}
        />

        <Button title="Next"
          onPress={() => this.props.navigation.navigate('sampleimage1')}
        />

      </View>
    )
  }
}

class Photo1 extends React.Component {

  render() {
    const imageData = this.props.navigation.getParam('imageData', 'No_image_data')
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Your Photo1</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: 'data:image/png;base64,' + imageData }}
        />

        <Button title="Next"
          onPress={() => this.props.navigation.navigate('sampleimage2')}
        />

      </View>
    )
  }
}


class Photo2 extends React.Component {

  render() {
    const imageData = this.props.navigation.getParam('imageData', 'No_image_data')
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Your Photo2</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: 'data:image/png;base64,' + imageData }}
        />

        <Button title="Next"
          onPress={() => this.props.navigation.navigate('sampleimage3')}
        />

      </View>
    )
  }
}

class Photo3 extends React.Component {

  render() {
    const imageData = this.props.navigation.getParam('imageData', 'No_image_data')
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Your Photo3</Text>

        <Image
          style={{ width: "100%", height: "75%" }}
          source={{ uri: 'data:image/png;base64,' + imageData }}
        />

        <Button title="Next"
          onPress={() => this.props.navigation.navigate('pending')}
        />

      </View>
    )
  }
}



// =========================navigation module for screen change=======================
// const AppSwitchNavigator = createSwitchNavigator({
//   Login:{screen: Login},
//   hello:{screen: Hello},
//   countdown:{screen: CountDown},
//   sampleimage:{screen: SampleImage},
//   takePhotoCountDown:{screen: TakePhotoCountDown},
//   welcome:{screen:VideoComponent},
//   pending:{screen:Pending},
//   photo:{screen:Photo}
// });

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: Login },
  emailLogin: { screen: emailLogin },
  hello: { screen: Hello },
  countdown: { screen: CountDown },
  sampleimage1: { screen: SampleImage1 },
  sampleimage2: { screen: SampleImage2 },
  sampleimage3: { screen: SampleImage3 },
  takePhotoCountDown0: { screen: TakePhotoCountDown0 },
  takePhotoCountDown1: { screen: TakePhotoCountDown1 },
  takePhotoCountDown2: { screen: TakePhotoCountDown2 },
  takePhotoCountDown3: { screen: TakePhotoCountDown3 },
  welcome: { screen: VideoComponent },
  pending: { screen: Pending },
  photo0: { screen: Photo0 },
  photo1: { screen: Photo1 },
  photo2: { screen: Photo2 },
  photo3: { screen: Photo3 }
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
