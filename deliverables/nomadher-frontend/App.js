import React from 'react';
import TakePhoto from './feature_component/TakePhoto.js'
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
// import {Constants, Video} from 'expo'
// import VideoComponent from './feature_component/Video.js'
import {Constants, Video} from 'expo'
import VideoComponent from './feature_component/Video.js'
import Login from './feature_component/Login.js'
import CountDown from './feature_component/countdown.js'
import Hello from './feature_component/hello.js'
import SampleImage from './feature_component/image.js'
// import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
// import * as firebase from 'firebase';
import { Navigation } from 'react-native-navigation';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';



export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
        // <Text style={{textAlign: 'center', fontSize: 25, fontWeight:'bold'}}> Video Verification</Text>
        // <VideoComponent />
        
      // </View>
      // <CountDown />
      <SampleImage />
      // <Login />
      // <Hello />

      // <AppContainer />
      
    )
      
  }
}


const AppSwitchNavigator = createSwitchNavigator({
  Login:{screen: Login},
  hello:{screen: Hello},
  countdown:{screen: CountDown}
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
