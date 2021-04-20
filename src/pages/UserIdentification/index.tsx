import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'

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

	function handleSubmit() {
		navigation.navigate('Confirmation')
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
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
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}