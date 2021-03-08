import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { API, graphqlOperation } from 'aws-amplify'
import { exchangeCoins } from '../../graphql/mutations'
import { listPortfolioCoins } from '../../graphql/queries'
import { RootStackParamList } from '../../../types'
import { useAppContext } from '../../contexts/AppContext'
import styles from './styles'
const image = require('../../../assets/images/Saly-31.png')

const USD_COIN_ID = 'ec407574-5a1c-4f86-89ff-b8dfdbfe1c6a'

const CoinExchangeScreen = () => {
  const [coinAmount, setCoinAmount] = useState('')
  const [coinValueUSD, setCoinValueUSD] = useState('')
  const [loading, setLoading] = useState(false)
  const { userId } = useAppContext()
  const maxUSD = 100000
  const navigation = useNavigation()
  const {
    params: { isBuy, coin, portfolioCoin },
  } = useRoute<RouteProp<RootStackParamList, 'CoinExchange'>>()

  const getPortfolioCoinId = async (coinId: string) => {
    try {
      const res: any = await API.graphql(
        graphqlOperation(listPortfolioCoins, {
          filter: {
            and: {
              coinId: { eq: coinId },
              userId: { eq: userId },
            },
          },
        })
      )
      if (res.data.listPortfolioCoins.items.length > 0) {
        return res.data.listPortfolioCoins.items[0].id
      } else {
        return null
      }
    } catch (err) {
      console.error(err)
    }
  }

  const placeOrder = async () => {
    if(loading) return
    setLoading(true)
    try {
      const res: any = await API.graphql(
        graphqlOperation(exchangeCoins, {
          coinId: coin.id,
          isBuy,
          amount: parseFloat(coinAmount),
          usdPortfolioCoinId: await getPortfolioCoinId(USD_COIN_ID),
          coinPortfolioCoinId: await getPortfolioCoinId(coin.id),
        })
      )
      if (res.data.exchangeCoins) {
        navigation.navigate('Portfolio')
      } else {
        Alert.alert('Error', 'There was an error exchanging coins.')
      }
    } catch (err) {
      console.error(err)
      Alert.alert('Error', 'There was an error exchanging coins.')
    } 
    setLoading(false)
  }

  const onPlaceOrder = async () => {
    if (isBuy && parseFloat(coinValueUSD) > maxUSD) {
      return Alert.alert('Error', `Not enough USD. Max: $${maxUSD}`)
    }
    if (
      !isBuy &&
      (!portfolioCoin || parseFloat(coinAmount) > portfolioCoin.amount)
    ) {
      return Alert.alert(
        'Error',
        `Not enough ${coin.symbol}. Max: ${coin.amount || 0}`
      )
    }

    await placeOrder()
  }

  useEffect(() => {
    const amount = parseFloat(coinAmount)
    if (!amount && amount !== 0) {
      setCoinAmount('')
      setCoinValueUSD('')
      return
    }
    setCoinValueUSD((amount * coin.currentPrice).toString())
  }, [coinAmount])

  useEffect(() => {
    const amount = parseFloat(coinValueUSD)
    if (!amount && amount !== 0) {
      setCoinAmount('')
      setCoinValueUSD('')
      return
    }
    setCoinAmount((amount / coin.currentPrice).toString())
  }, [coinValueUSD])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
    >
      <Text style={styles.heading}>
        {isBuy ? 'Buy' : 'Sell'} {coin.name}
      </Text>
      <Text style={styles.subheading}>
        1 {coin.symbol} = ${coin.currentPrice}
      </Text>
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
          <Text style={styles.symbol}>{coin.symbol}</Text>
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
        {loading && <ActivityIndicator color='white' style={styles.loading} />}
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default CoinExchangeScreen
