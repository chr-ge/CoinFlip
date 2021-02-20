import React from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import MarketCoin from '../../components/MarketCoin'
import styles from './styles'
const image = require('../../../assets/images/Saly-17.png')

const COINS = [
  { id: 1, name: 'Virtual USD', image: '', symbol: 'VUSD', valueChange1H: -1.232, valueUSD: 1000 },
  { id: 2, name: 'Bitcoin', image: '', symbol: 'BTC', valueChange1H: 1.56, valueUSD: 65464 },
]

const MarketScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={COINS}
        renderItem={({ item }) => (
          <MarketCoin
            name={item.name}
            image={item.image}
            symbol={item.symbol}
            valueUSD={item.valueUSD}
            valueChange1H={item.valueChange1H}
          />
        )}
        style={{ width: '100%' }}
        ListHeaderComponentStyle={{ alignItems: 'center' }}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <Text style={styles.market}>Market</Text>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default MarketScreen
