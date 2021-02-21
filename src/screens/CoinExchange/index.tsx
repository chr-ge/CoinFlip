import React, { useEffect, useState } from 'react'
import { Alert, Image, Platform, Pressable, KeyboardAvoidingView, Text, TextInput, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../types'
import styles from './styles'
const image = require('../../../assets/images/Saly-31.png')

const CoinExchangeScreen = () => {
  const [coinAmount, setCoinAmount] = useState('')
  const [coinValueUSD, setCoinValueUSD] = useState('')
  const maxUSD = 100000
  const {
    params: { isBuy, coinData },
  } = useRoute<RouteProp<RootStackParamList, 'CoinExchange'>>()

  const onPlaceOrder = async () => {
    if (isBuy && parseFloat(coinValueUSD) > maxUSD) {
      return Alert.alert('Error', `Not enough USD. Max: $${maxUSD}`)
    }
    if (!isBuy && parseFloat(coinAmount) > coinData.amount) {
      return Alert.alert('Error', `Not enough ${coinData.symbol}. Max: ${coinData.amount}`)
    }
  }

  useEffect(() => {
    const amount = parseFloat(coinAmount)
    if (!amount && amount !== 0) {
      setCoinAmount('')
      setCoinValueUSD('')
      return
    }
    setCoinValueUSD((amount * coinData.currentPrice).toString())
  }, [coinAmount])

  useEffect(() => {
    const amount = parseFloat(coinValueUSD)
    if (!amount && amount !== 0) {
      setCoinAmount('')
      setCoinValueUSD('')
      return
    }
    setCoinAmount((amount / coinData.currentPrice).toString())
  }, [coinValueUSD])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
    >
      <Text style={styles.heading}>{isBuy ? 'Buy' : 'Sell'} {coinData.name}</Text>
      <Text style={styles.subheading}>1 {coinData.symbol} = ${coinData.currentPrice}</Text>
      <Image style={styles.image} source={image} />
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={coinAmount}
            placeholder='0'
            onChangeText={setCoinAmount}
            keyboardType='decimal-pad'
            returnKeyType='done'
            returnKeyLabel='done'
          />
          <Text style={styles.symbol}>{coinData.symbol}</Text>
        </View>
        <Text style={styles.equal}>=</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={coinValueUSD}
            placeholder='0'
            onChangeText={setCoinValueUSD}
            keyboardType='decimal-pad'
            returnKeyType='done'
            returnKeyLabel='done'
          />
          <Text style={styles.symbol}>USD</Text>
        </View>
      </View>
      <Pressable onPress={onPlaceOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default CoinExchangeScreen
