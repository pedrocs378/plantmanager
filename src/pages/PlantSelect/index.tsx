import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { EnviromentButton } from '../../components/EnviromentButton'
import { Header } from '../../components/Header'
import { Load } from '../../components/Load'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'

import { PlantProps } from '../../libs/storage'
import { api } from '../../services/api'

import colors from '../../styles/colors'
import { styles } from './styles'

interface Environment {
	key: string
	title: string
}

export function PlantSelect() {
	const [environments, setEnvironments] = useState<Environment[]>([])
	const [plants, setPlants] = useState<PlantProps[]>([])
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [environmentSelected, setEnvironmentSelected] = useState('all')

	const [page, setPage] = useState(1)
	const [loadingMore, setLoadingMore] = useState(false)

	const navigation = useNavigation()

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

	const handlePlantSelect = useCallback((plant: PlantProps) => {
		navigation.navigate('PlantSave', { plant })
	}, [navigation.navigate])

	async function fetchPlants() {
		api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=7`).then(response => {
			if (!response.data) {
				return setLoading(true)
			}

			if (page > 1) {
				setPlants(oldValue => [...oldValue, ...response.data])
				setFilteredPlants(oldValue => [...oldValue, ...response.data])
			} else {
				setPlants(response.data)
				setFilteredPlants(response.data)
			}
		}).finally(() => {
			setLoading(false)
			setLoadingMore(false)
		})
	}

	function handleFetchMore(distance: number) {
		if (distance < 1) {
			return
		}

		setLoadingMore(true)
		setPage(oldValue => oldValue + 1)
		fetchPlants()
	}

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
		fetchPlants()
	}, [])

	if (loading) {
		return <Load />
	}

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
					keyExtractor={(item => item.key)}
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
					keyExtractor={(item => String(item.id))}
					renderItem={({ item }) => (
						<PlantCardPrimary
							key={item.id}
							data={item}
							onPress={() => handlePlantSelect(item)}
						/>
					)}
					onEndReachedThreshold={0.1}
					onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
					ListFooterComponent={
						loadingMore ? <ActivityIndicator color={colors.green} /> : null
					}
				/>
			</View>

		</SafeAreaView>
	)
}