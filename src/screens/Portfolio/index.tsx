import React from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import PortfolioCoin from '../../components/PortfolioCoin'
import styles from './styles'
const image = require('../../../assets/images/Saly-10.png')

const PortfolioScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={COINS}
        renderItem={({ item }) => (
          <PortfolioCoin
            id={item.id}
            name={item.name}
            image={item.image}
            symbol={item.symbol}
            amount={item.amount}
            valueUSD={item.valueUSD}
          />
        )}
        style={{ width: '100%' }}
        ListHeaderComponentStyle={{ alignItems: 'center' }}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
              <Text style={styles.label}>Portfolio</Text>
              <Text style={styles.balance}>$100,000</Text>
            </View>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default PortfolioScreen
