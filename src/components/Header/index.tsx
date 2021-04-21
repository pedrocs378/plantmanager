import React from 'react'
import { Image, Text, View } from 'react-native'

import userImg from '../../assets/pedro.png'
import { styles } from './styles'

export function Header() {

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Olá,</Text>
				<Text style={styles.userName}>Pedro</Text>
			</View>

			<Image style={styles.image} source={userImg} />
		</View>
	)
}