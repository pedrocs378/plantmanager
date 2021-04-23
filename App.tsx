import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import { PlantProps } from './src/libs/storage';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log(data)
      }
    )

    return () => subscription.remove()

    // async function notifications() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync()
    //   console.log('####### NOTIFICACAOES AGENDADAS ############')
    //   console.log(data)
    // }

    // notifications()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}