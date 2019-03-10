import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera, Permissions } from 'expo'

// This is component that can display the camera(both front and end) and take
// picture automatically.
// This component takes two props:
// 1. takePhoto: this is a boolean props, when it turn from false to true, it will
// triger the camera to take a photo.
// 2. process: this is an unary function, passed in by the parent component. it will
// be excuted after taking the photo. Which should use the photo as the input and 
// do some process that difined by the parent component.
export default class TakePhoto extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasCameraPermission: null,
    		type: Camera.Constants.Type.front,
    		autoFocus: Camera.Constants.AutoFocus.on,
		}
	}

	async componentDidMount() {
		// Get camera permissions.
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })

		console.log(this.props.takePhoto)
	}

	// Take photo when takePhoto props update.
	async componentDidUpdate(prevProps) {
		if (this.props.takePhoto && !prevProps.takePhoto) {
			if (this.camera) {
				let img = await this.camera.takePictureAsync()
				this.props.process(img)
			}
			console.log("get called")
		}
	}

	render() {
		const { hasCameraPermission } = this.state
		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>
		} else {
			// Display Camera page.
			return (
				<View> 
					<Camera 
						ref={ref => { this.camera = ref }}
						type={this.state.type} 
						autoFocus={ this.state.autoFocus }> 
						<View> 
							<TouchableOpacity 
								onPress={() => {
									this.setState({
										type: this.state.type === Camera.Constants.Type.front 
											? Camera.Constants.Type.back 
											: Camera.Constants.Type.front
									})
							}}>
								<Text> 
									{' '}Flip{' '}
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			)
		}
	}
}
