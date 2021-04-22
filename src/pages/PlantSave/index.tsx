import React, { useState } from 'react';
import { Image, Platform, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';

import { Button } from '../../components/Button';

import { PlantProps, savePlant } from '../../libs/storage';
import waterdrop from '../../assets/waterdrop.png'

import { styles } from './styles'

interface Params {
	plant: PlantProps
}

const PlantSave = () => {
	const [selectedDateTime, setSelectedDateTime] = useState(new Date())
	const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

	const navigation = useNavigation()
	const { params } = useRoute()
	const { plant } = params as Params

	function handleChangeTime(_: Event, dateTime: Date | undefined) {
		if (Platform.OS === 'android') {
			setShowDatePicker(oldState => !oldState)
		}

		if (dateTime && isBefore(dateTime, new Date())) {
			setSelectedDateTime(new Date())
			return ToastAndroid.show('Escolha uma hora no futuro!', ToastAndroid.LONG)
		}

		if (dateTime) {
			setSelectedDateTime(dateTime)
		}
	}

	async function handleSave() {
		try {
			await savePlant({
				...plant,
				dateTimeNotification: selectedDateTime
			})

			navigation.navigate('Confirmation', {
				title: 'Tudo certo',
				subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
				buttonText: 'Muito obrigado',
				icon: 'hug',
				nextScreen: 'MyPlants'
			})
		} catch {
			ToastAndroid.show('Não foi possivel salvar. 😥', ToastAndroid.LONG)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.plantInfo}>
				<SvgFromUri
					uri={plant.photo}
					height={150}
					width={150}
				/>
				<Text style={styles.plantName}>
					{plant.name}
				</Text>
				<Text style={styles.plantAbout}>
					{plant.about}
				</Text>
			</View>
			<View style={styles.controller}>
				<View style={styles.tipContainer}>
					<Image
						source={waterdrop}
						style={styles.tipImage}
					/>
					<Text style={styles.tipText}>
						{plant.water_tips}
					</Text>
				</View>

				<Text style={styles.alertLabel}>
					Escolha o melhor horário para ser lembrado.
				</Text>

				{showDatePicker && (
					<DateTimePicker
						mode="time"
						value={selectedDateTime}
						display="default"
						onChange={handleChangeTime}
					/>
				)}

				{Platform.OS === 'android' && (
					<TouchableOpacity
						style={styles.dateTimePickerButton}
						onPress={() => setShowDatePicker(oldState => !oldState)}
					>
						<Text style={styles.dateTimePickerText}>
							{`Mudar ${format(selectedDateTime, 'HH:mm')}`}
						</Text>
					</TouchableOpacity>

				)}

				<Button onPress={handleSave}>
					Cadastrar planta
				</Button>
			</View>
		</View>
	);
};

export { PlantSave };


