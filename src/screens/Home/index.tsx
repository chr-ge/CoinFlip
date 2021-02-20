import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'

const image = require('../../../assets/images/Saly-1.png')

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.heading}>Welcome to CoinFlip</Text>
      <Text style={styles.subheading}>Invest your virtual $100,000 and compete with others.</Text>
    </View>
  )
}

export default HomeScreen
