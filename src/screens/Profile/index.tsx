import React, { useEffect, useState } from 'react'
import { Image, Text, Pressable, View, ActivityIndicator } from 'react-native'
import { Auth } from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../../graphql/queries'
import { CommonActions, useNavigation } from '@react-navigation/native'
import styles from './styles'
import { useAppContext } from '../../contexts/AppContext'
const image = require('../../../assets/images/Saly-16.png')

type User = {
  name: string
  image: string
  email: string
  networth: number
}

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState<User>()
  const { userId } = useAppContext()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: any = await API.graphql(graphqlOperation(getUser, { id: userId }))
        setUser(res.data.getUser)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  const signOut = async () => {
    await Auth.signOut()
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      })
    )
  }

  if (!user) return <ActivityIndicator />

  return (
    <View style={styles.container}>
      <Image source={image} />
      <View style={styles.userContainer}>
        <View style={styles.leftContainer}>
          <Image style={styles.userImage} source={{ uri: user.image }} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <Text style={styles.netWorth}>${user.networth}</Text>
      </View>
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen
