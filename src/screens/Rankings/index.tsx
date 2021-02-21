import React from 'react'
import { Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import UserRankingItem from '../../components/UserRankingItem'
import styles from './styles'
const image = require('../../../assets/images/Saly-20.png')

const COINS = [
  { id: 1, name: 'Virtual USD', image: '', netWorth: 1000 },
  { id: 2, name: 'Bitcoin', image: '', netWorth: 65464 },
]

const RankingsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={COINS}
        renderItem={({ item, index }) => (
          <UserRankingItem
            ranking={index + 1}
            name={item.name}
            image={item.image}
            netWorth={item.netWorth}
          />
        )}
        style={{ width: '100%' }}
        ListHeaderComponentStyle={{ alignItems: 'center' }}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <Text style={styles.rankings}>Rankings</Text>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default RankingsScreen
