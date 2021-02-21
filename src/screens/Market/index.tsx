import React, { useState, useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { API, graphqlOperation } from 'aws-amplify'
import { listCoins } from '../../graphql/queries'
import MarketCoin from '../../components/MarketCoin'
import styles from './styles'
const image = require('../../../assets/images/Saly-17.png')

const MarketScreen = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchCoins = async () => {
    setLoading(true)
    try {
      const res: any = await API.graphql(graphqlOperation(listCoins))
      setCoins(res.data.listCoins.items)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        renderItem={({ item }: any) => (
          <MarketCoin
            name={item.name}
            image={item.image}
            symbol={item.symbol}
            currentPrice={item.currentPrice}
            valueChange1H={item.valueChange1H}
          />
        )}
        onRefresh={fetchCoins}
        refreshing={loading}
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
