import React from 'react'
import { Image, Text, View, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'

const image = require('../../../assets/images/Saly-1.png')

const WelcomeScreen = () => {
  const signInGoogle = async () => {}
  const signInApple = async () => {}
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.heading}>Welcome to CoinFlip</Text>
      <Text style={styles.subheading}>Invest your virtual $100,000 and compete with others.</Text>
      <View style={styles.authButtons}>
        <Pressable 
          onPress={signInGoogle} 
          style={[styles.authButton, { backgroundColor: '#4285F4' }]}
          android_disableSound
        >
          <AntDesign name="google" size={30} color="white" />
          <Text style={[styles.authText, { color: 'white' }]}>Login with Google</Text>
        </Pressable>
        <Pressable 
          onPress={signInApple} 
          style={[styles.authButton, { backgroundColor: 'white' }]}
          android_disableSound
        >
          <AntDesign name="apple1" size={30} color="black" />
          <Text style={styles.authText}>Login with Apple</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default WelcomeScreen
