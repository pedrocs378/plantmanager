import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { SafeAreaView, Text, View, } from 'react-native'

import { Button } from '../../components/Button'

import { styles } from './styles'

interface Params {
	title: string
	subtitle: string
	buttonText: string
	icon: 'smile' | 'hug'
	nextScreen: string
}

const emojis = {
	hug: '🤗',
	smile: '😄'
}

export function Confirmation() {
	const navigation = useNavigation()
	const routes = useRoute()

	const {
		title,
		subtitle,
		buttonText,
		icon,
		nextScreen
	} = routes.params as Params

	function handleMoveOn() {
		navigation.navigate(nextScreen)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>
					{emojis[icon]}
				</Text>
				<Text style={styles.title}>
					{title}
				</Text>
				<Text style={styles.subtitle}>
					{subtitle}
				</Text>

				<View style={styles.footer}>
					<Button onPress={handleMoveOn}>{buttonText}</Button>
				</View>
			</View>
		</SafeAreaView>
	)
}