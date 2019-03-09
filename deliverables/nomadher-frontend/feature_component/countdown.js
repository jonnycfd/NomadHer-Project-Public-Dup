import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class CountDown extends Component {
	constructor(props) {
		super(props)
		this.state = { countDown: this.props.initCount? this.props.initCount: 10}
	}

	componentDidMount() {
		setInterval (() => {
			if (this.state.countDown > 0) {
				this.setState({countDown: this.state.countDown - 1})
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
