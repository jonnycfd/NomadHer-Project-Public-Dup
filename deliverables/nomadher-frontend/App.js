import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import {Constants, Video} from 'expo'
import VideoComponent from './Video.js'

import CountDown from './feature_component/countdown.js'
import TakePhoto from './feature_component/TakePhoto.js'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			takePhoto: false,
		}
	}
	
	// Call this function when the countdown is finish.
	onFinish = () => {
		this.setState({takePhoto: true})
    console.log(this.state.takePhoto)
		console.log("Finish countdown!")
	}

	// Call this function after you got the photo.
	processImg = img => {
		// ... Do something with img. like send it out or something.
		console.log(img)
		this.setState({takePhoto: false})
		console.log("Photo processing finished!")
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Test, this is the login page.</Text>
				<CountDown initCount={10} passIn={this.onFinish} />
				<TakePhoto takePhoto={this.state.takePhoto} process={this.processImg} />
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
		fontSize: 140,
	}
});
