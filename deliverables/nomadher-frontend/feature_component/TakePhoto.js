import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera, Permissions } from 'expo'

export default class TakePhoto extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasCameraPermission: null,
    		type: Camera.Constants.Type.front,
		}
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	render() {
		const { hasCameraPermission } = this.state
		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>
		} else {
			return (
				<View> 
					<Camera type={this.state.type}> 
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