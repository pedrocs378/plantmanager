import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../../components/Button'
import colors from '../../styles/colors'

import { styles } from './styles'

export function UserIdentification() {
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [name, setName] = useState('')

	const navigation = useNavigation()

	function handleInputBlur() {
		setIsFocused(false)
		setIsFilled(!!name)
	}

	function handleInputChange(text: string) {
		setIsFilled(!!text)
		setName(text)
	}

	async function handleSubmit() {
		if (!name.trim()) {
			return ToastAndroid.show('Você deve informar o nome primeiro 😥', ToastAndroid.LONG)
		}

		try {
			await AsyncStorage.setItem('@plantmanager:user', name)
			navigation.navigate('Confirmation')
		} catch {
			ToastAndroid.show('Não foi possivel salvar o seu nome.', ToastAndroid.LONG)
		}

	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.content}>
						<View style={styles.form}>
							<View style={styles.header}>
								<Text style={styles.emoji}>
									{isFilled ? '😄' : '😃'}
								</Text>
								<Text style={styles.title}>
									Como podemos {'\n'}
									chamar você?
								</Text>
							</View>

							<TextInput
								style={[
									styles.input,
									(isFocused || isFilled) && { borderColor: colors.green }
								]}
								placeholder="Digite um nome"
								onBlur={handleInputBlur}
								onFocus={() => setIsFocused(true)}
								onChangeText={handleInputChange}
							/>

							<View style={styles.footer}>
								<Button onPress={handleSubmit}>Confirmar</Button>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}