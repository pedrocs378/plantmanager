import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'

interface ButtonProps {
	children: string
}

export function Button({ children }: ButtonProps) {

	return (
		<TouchableOpacity style={styles.button} activeOpacity={0.8}>
			<Text style={styles.buttonText}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}