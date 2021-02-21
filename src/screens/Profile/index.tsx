import React, { useState } from 'react'
import { Image, Text, Pressable, View } from 'react-native'
import styles from './styles'
const image = require('../../../assets/images/Saly-16.png')

const ProfileScreen = () => {
  const [user, setUser] = useState({
    id: '1',
    name: 'George',
    email: 'george@example.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
    netWorth: 100000,
  })

  const signOut = async () => {}

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
        <Text style={styles.netWorth}>${user.netWorth}</Text>
      </View>
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen
