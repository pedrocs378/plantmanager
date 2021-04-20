import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
		width: '100%'
	},
	emoji: {
		fontSize: 78
	},
	title: {
		fontSize: 22,
		lineHeight: 38,
		textAlign: 'center',
		color: colors.heading,
		fontFamily: fonts.heading,
		marginTop: 15
	},
	subtitle: {
		fontSize: 17,
		textAlign: 'center',
		color: colors.heading,
		fontFamily: fonts.text,
		paddingVertical: 10
	},
	footer: {
		width: '100%',
		paddingHorizontal: 50,
		marginTop: 20
	}
})