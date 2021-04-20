import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { styles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
	children: string
}

export function Button({ children, ...rest }: ButtonProps) {

	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
			<Text style={styles.text}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}