import React, { useEffect, useState } from 'react'
import { Image, Text, View, FlatList } from 'react-native'
import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Header } from '../../components/Header'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'
import { Load } from '../../components/Load'

import { loadPlant, PlantProps } from '../../libs/storage'
import waterdrop from '../../assets/waterdrop.png'

import { styles } from './styles'

export function MyPlants() {
	const [myPlants, setMyPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [nextWatered, setNextWatered] = useState('')

	useEffect(() => {
		async function loadStoragedData() {
			const plantsStoraged = await loadPlant()

			const nextTime = formatDistance(
				new Date(plantsStoraged[0].dateTimeNotification).getTime(),
				new Date().getTime(),
				{ locale: ptBR }
			)

			setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à aproximadamente ${nextTime}`)
			setMyPlants(plantsStoraged)
			setLoading(false)
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
							<PlantCardSecondary key={item.id} data={item} />
						)
					}}
				/>
			</View>
		</View>
	)
}