import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'

import { EnviromentButton } from '../../components/EnviromentButton'
import { Header } from '../../components/Header'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'

import { api } from '../../services/api'

import { styles } from './styles'

interface Environment {
	key: string
	title: string
}

interface Plant {
	id: number
	name: string
	about: string
	water_tips: string
	photo: string
	environments: string[]
	frequency: {
		times: number
		repeat_every: string
	}
}

export function PlantSelect() {
	const [environments, setEnvironments] = useState<Environment[]>([])
	const [plants, setPlants] = useState<Plant[]>([])
	const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
	const [environmentSelected, setEnvironmentSelected] = useState('all')

	const handleEnvironmentSelected = useCallback((environment: string) => {
		setEnvironmentSelected(environment)

		if (environment === 'all') {
			return setFilteredPlants(plants)
		}

		const filtered = plants.filter(plant => {
			return plant.environments.includes(environment)
		})

		setFilteredPlants(filtered)
	}, [plants])

	useEffect(() => {
		api.get('/plants_environments?_sort=title&_order=asc').then(response => {
			setEnvironments([
				{
					key: 'all',
					title: 'Todos'
				},
				...response.data,
			])
		})
	}, [])

	useEffect(() => {
		api.get('/plants?_sort=name&_order=asc').then(response => {
			setPlants(response.data)
			setFilteredPlants(response.data)
		})
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<Header />

			<Text style={styles.title}>
				Em qual ambiente
			</Text>
			<Text style={styles.subtitle}>
				você quer colocar sua planta?
			</Text>

			<View>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.enviromentList}
					data={environments}
					renderItem={({ item }) => (
						<EnviromentButton
							key={item.key}
							active={item.key === environmentSelected}
							onPress={() => handleEnvironmentSelected(item.key)}
						>
							{item.title}
						</EnviromentButton>
					)}
				/>
			</View>

			<View style={styles.plants}>
				<FlatList
					showsVerticalScrollIndicator={false}
					numColumns={2}
					data={filteredPlants}
					renderItem={({ item }) => (
						<PlantCardPrimary key={item.id} data={item} />
					)}
				/>
			</View>

		</SafeAreaView>
	)
}