import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles'
import PercentageChange from '../../components/PercentageChange'

const CoinDetailsScreen = () => {
  const [coinData, setCoinData] = useState({
    id: 1,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    currentPrice: 59213,
    valueChange1H: 1.236,
    valueChange1D: 2.654,
    valueChange7D: 3.289,
    amount: 1.5,
  })

  const onBuy = async () => {}

  const onSell = async () => {}

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.image} source={{ uri: coinData.image }} />
        <View style={styles.topTextContainer}>
          <Text style={styles.name}>{coinData.name}</Text>
          <Text style={styles.symbol}>{coinData.symbol}</Text>
        </View>
        <AntDesign name='star' color='#56DCBA' size={30} />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.currentPrice}>Current Price</Text>
          <Text style={styles.currentPriceValue}>${coinData.currentPrice}</Text>
        </View>
        <View style={styles.valueChangeContainer}>
          <View>
            <Text style={styles.valueLabel}>1H</Text>
            <PercentageChange value={coinData.valueChange1H} />
          </View>
          <View>
            <Text style={styles.valueLabel}>1D</Text>
            <PercentageChange value={coinData.valueChange1D} />
          </View>
          <View>
            <Text style={styles.valueLabel}>7D</Text>
            <PercentageChange value={coinData.valueChange7D} />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.position}>Position</Text>
        <Text style={styles.position}>
          {coinData.symbol} {coinData.amount} ($
          {coinData.amount * coinData.currentPrice})
        </Text>
      </View>
      <View style={[styles.row, { marginTop: 'auto' }]}>
        <Pressable
          onPress={onBuy}
          style={[styles.button, { backgroundColor: '#FF0000', marginRight: 5 }]}
        >
          <Text style={styles.buttonText}>Sell</Text>
        </Pressable>
        <Pressable
          onPress={onSell}
          style={[styles.button, { backgroundColor: '#20B100', marginLeft: 5 }]}
        >
          <Text style={styles.buttonText}>Buy</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CoinDetailsScreen
