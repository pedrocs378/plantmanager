import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, View, FlatList, Alert } from 'react-native'
import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Header } from '../../components/Header'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'
import { Load } from '../../components/Load'

import { loadPlant, PlantProps, removePlant } from '../../libs/storage'

import waterdrop from '../../assets/waterdrop.png'

import { styles } from './styles'

export function MyPlants() {
	const [myPlants, setMyPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [nextWatered, setNextWatered] = useState('')

	const handleRemove = useCallback((plant: PlantProps) => {
		Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
			{
				text: 'Não 🙏',
				style: 'cancel'
			},
			{
				text: 'Sim 😥',
				onPress: async () => {
					try {
						await removePlant(plant.id)

						setMyPlants(oldData => {
							return oldData.filter(item => item.id !== plant.id)
						})
					} catch {
						Alert.alert('Não foi possivel remover! 😥')
					}
				}
			}
		])
	}, [])

	useEffect(() => {
		async function loadStoragedData() {
			try {
				const plantsStoraged = await loadPlant()

				const nextTime = formatDistance(
					new Date(plantsStoraged[0].dateTimeNotification).getTime(),
					new Date().getTime(),
					{ locale: ptBR }
				)

				setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à aproximadamente ${nextTime}`)
				setMyPlants(plantsStoraged)
			} catch {
				setNextWatered('Não há plantas para serem regadas')
				setMyPlants([])
			} finally {
				setLoading(false)
			}
		}

		loadStoragedData()
	}, [loadPlant])

	if (loading) {
		return <Load />
	}

	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.spotlight}>
				<Image
					style={styles.spotlightImage}
					source={waterdrop}
				/>
				<Text style={styles.spotlightText}>
					{nextWatered}
				</Text>
			</View>

			<View style={styles.plants}>
				<Text style={styles.plantsTitle}>
					Próximas regadas
				</Text>

				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flex: 1 }}
					data={myPlants}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => {
						return (
							<PlantCardSecondary
								key={item.id}
								data={item}
								handleRemove={() => handleRemove(item)}
							/>
						)
					}}
				/>
			</View>
		</View>
	)
}