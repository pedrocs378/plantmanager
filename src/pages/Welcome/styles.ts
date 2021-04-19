import { StyleSheet } from 'react-native'

import colors from '../../styles/colors'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.heading,
		marginTop: 52
	},
	image: {
		width: 292,
		height: 284
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading
	}
})