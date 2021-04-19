import React from 'react'
import { SafeAreaView, Image, Text } from 'react-native'

import { Button } from '../../components/Button'

import wateringImg from '../../assets/watering.png'

import { styles } from './styles'

export function Welcome() {

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>
				Gerencie {'\n'}
				suas plantas {'\n'}
				de forma fácil
			</Text>

			<Image source={wateringImg} style={styles.image} />

			<Text style={styles.subtitle}>
				Não esqueça mais de regar suas plantas.
				Nós cuidamos de lembrar você sempre que precisar.
			</Text>

			<Button>
				{'>'}
			</Button>
		</SafeAreaView>
	)
}