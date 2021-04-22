import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userImg from '../../assets/pedro.png'

import { styles } from './styles'

export function Header() {
	const [userName, setUserName] = useState('')

	useEffect(() => {
		AsyncStorage.getItem('@plantmanager:user').then(value => {
			if (value) {
				setUserName(value)
			}
		})
	}, [])

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Olá,</Text>
				<Text style={styles.userName}>{userName}</Text>
			</View>

			<Image style={styles.image} source={userImg} />
		</View>
	)
}