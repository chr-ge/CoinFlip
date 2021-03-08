import React, { useState, useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { API, graphqlOperation } from 'aws-amplify'
import { useAppContext } from '../../contexts/AppContext'
import PortfolioCoin from '../../components/PortfolioCoin'
import { getUserPortfolio } from './query'
import styles from './styles'
const image = require('../../../assets/images/Saly-10.png')

const PortfolioScreen = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [coins, setCoins] = useState<any[]>([])
  const { userId } = useAppContext()

  const fetchPortfolioCoins = async () => {
    setLoading(true)
    try {
      const res: any = await API.graphql(
        graphqlOperation(getUserPortfolio, { id: userId })
      )
      setBalance(res.data.getUser.networth)
      setCoins(res.data.getUser.portfolioCoins.items)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolioCoins()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <PortfolioCoin
            amount={item.amount}
            id={item.coin.id}
            name={item.coin.name}
            image={item.coin.image}
            symbol={item.coin.symbol}
            currentPrice={item.coin.currentPrice}
          />
        )}
        style={{ width: '100%' }}
        onRefresh={fetchPortfolioCoins}
        refreshing={loading}
        ListHeaderComponentStyle={{ alignItems: 'center' }}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
              <Text style={styles.label}>Portfolio</Text>
              <Text style={styles.balance}>${balance}</Text>
            </View>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default PortfolioScreen
