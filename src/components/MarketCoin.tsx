import React from 'react'
import { StyleSheet, Image, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PercentageChange from './PercentageChange'

interface IMarketCoinProps {
  image: string
  name: string
  symbol: string
  valueUSD: number
  valueChange1H: number
}

const MarketCoin = ({ image, name, symbol, valueChange1H, valueUSD }: IMarketCoinProps) => {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails')} style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueUSD}>${valueUSD}</Text>
        <PercentageChange value={valueChange1H} />
      </View>
    </Pressable>
  )
}

export default MarketCoin

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    padding: 6,
    height: 55,
    backgroundColor: '#26242D',
  },
  image: {
    width: 45,
    height: 45,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-evenly',
    height: '100%',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
  },
  symbol: {
    color: '#777777',
  },
  valueContainer: {
    justifyContent: 'space-evenly',
    height: '100%',
    alignItems: 'flex-end',
  },
  valueUSD: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})
