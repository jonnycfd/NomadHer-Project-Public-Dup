import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// This component can display a count down on the screen.
// It has two props.
// 1. initCount: This will set the countdown time in second, which is default to 10
// 2. passIn: Parent component can passing any nullary function, which will be
// excuted after the countdown finished.
export default class CountDown extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			countDown: this.props.initCount? this.props.initCount : 3, 
			finish: false,
		}
	}

	componentDidMount() {
		// Update the countdown value.
		setInterval (() => {
			if (!this.state.finish) {
				this.setState({countDown: this.state.countDown - 1})
				
				// Stop count down and excute the passin function.
				if (this.state.countDown === 0) {
					this.setState({finish: true})
					this.props.passIn()
				}
			}
		}, 1000)
	}

	render() {
		return (
			<Text Style={styles.countDown}> 
				{this.state.countDown}
			</Text>
		)
	}
}

const styles = StyleSheet.create({
  countDown: {
    color: 'lightblue',
    fontSize: 140,
  },
})
