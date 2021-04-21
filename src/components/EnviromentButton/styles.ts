import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.shape,
		height: 40,
		width: 76,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		marginHorizontal: 5

	},
	containerActive: {
		backgroundColor: colors.green_light
	},
	text: {
		color: colors.heading,
		fontFamily: fonts.text
	},
	textActive: {
		fontFamily: fonts.heading,
		color: colors.green_dark,
	}
})