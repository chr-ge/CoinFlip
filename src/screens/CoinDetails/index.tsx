import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { API, graphqlOperation } from 'aws-amplify'
import { getCoin, listPortfolioCoins } from '../../graphql/queries'
import PercentageChange from '../../components/PercentageChange'
import CoinPriceGraph from '../../components/CoinPriceGraph'
import { RootStackParamList } from '../../../types'
import styles from './styles'
import { useAppContext } from '../../contexts/AppContext'

const CoinDetailsScreen = () => {
  const navigation = useNavigation()
  const { params } = useRoute<RouteProp<RootStackParamList, 'CoinDetails'>>()
  const [coin, setCoin] = useState<any | null>(null)
  const [portfolioCoin, setPortfolioCoin] = useState<any | null>(null)
  const { userId } = useAppContext()

  const fetchCoinData = async () => {
    try {
      const res: any = await API.graphql(
        graphqlOperation(getCoin, { id: params.id })
      )
      setCoin(res.data.getCoin)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPortfolioCoinData = async () => {
    try {
      const res: any = await API.graphql(
        graphqlOperation(listPortfolioCoins, {
          filter: {
            and: {
              coinId: { eq: params.id },
              userId: { eq: userId },
            },
          },
        })
      )
      setPortfolioCoin(res.data.listPortfolioCoins.items[0])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCoinData()
    fetchPortfolioCoinData()
  }, [])

  const onBuy = () => {
    navigation.navigate('CoinExchange', { isBuy: true, coin, portfolioCoin })
  }

  const onSell = () => {
    navigation.navigate('CoinExchange', { isBuy: false, coin, portfolioCoin })
  }

  if (!coin) return <ActivityIndicator style={{ marginTop: 20 }} />

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <View style={styles.topTextContainer}>
          <Text style={styles.name}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol}</Text>
        </View>
        <AntDesign name='star' color='#56DCBA' size={30} />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.currentPrice}>Current Price</Text>
          <Text style={styles.currentPriceValue}>${coin.currentPrice}</Text>
        </View>
        <View style={styles.valueChangeContainer}>
          <View>
            <Text style={styles.valueLabel}>1H</Text>
            <PercentageChange value={coin.valueChange1H} />
          </View>
          <View>
            <Text style={styles.valueLabel}>1D</Text>
            <PercentageChange value={coin.valueChange1D} />
          </View>
          <View>
            <Text style={styles.valueLabel}>7D</Text>
            <PercentageChange value={coin.valueChange7D} />
          </View>
        </View>
      </View>
      {coin.priceHistory && <CoinPriceGraph priceHistory={coin.priceHistory} />}
      {portfolioCoin && (
        <View style={styles.row}>
          <Text style={styles.position}>Position</Text>
          <Text style={styles.position}>
            {coin.symbol} {portfolioCoin.amount.toFixed(3)} ($
            {(portfolioCoin.amount * coin.currentPrice).toFixed(3)})
          </Text>
        </View>
      )}
      <View style={[styles.row, { marginTop: 'auto' }]}>
        <Pressable
          onPress={onSell}
          style={[
            styles.button,
            { backgroundColor: '#FF0000', marginRight: 5 },
          ]}
        >
          <Text style={styles.buttonText}>Sell</Text>
        </Pressable>
        <Pressable
          onPress={onBuy}
          style={[styles.button, { backgroundColor: '#20B100', marginLeft: 5 }]}
        >
          <Text style={styles.buttonText}>Buy</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CoinDetailsScreen
