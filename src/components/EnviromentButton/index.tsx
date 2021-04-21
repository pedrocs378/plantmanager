import React from 'react'
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

interface EnviromentButtonProps extends RectButtonProps {
	children: string
	active?: boolean
}

export function EnviromentButton({ children, active = false, ...rest }: EnviromentButtonProps) {

	return (
		<RectButton
			style={[styles.container, active && styles.containerActive]}
			{...rest}
		>
			<Text
				style={[styles.text, active && styles.textActive]}
			>
				{children}
			</Text>
		</RectButton>
	)
}

