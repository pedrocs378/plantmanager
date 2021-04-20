import React from 'react'
import { SafeAreaView, Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

import wateringImg from '../../assets/watering.png'

import { styles } from './styles'

export function Welcome() {
	const navigation = useNavigation()

	function handleStart() {
		navigation.navigate('UserIdentification')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>
					Gerencie {'\n'}
					suas plantas de {'\n'}
					forma fácil
				</Text>

				<Image
					source={wateringImg}
					style={styles.image}
					resizeMode="contain"
				/>

				<Text style={styles.subtitle}>
					Não esqueça mais de regar suas plantas.
					Nós cuidamos de lembrar você sempre que precisar.
				</Text>

				<TouchableOpacity onPress={handleStart} style={styles.button} activeOpacity={0.8}>
					<Feather name="chevron-right" style={styles.buttonIcon} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}