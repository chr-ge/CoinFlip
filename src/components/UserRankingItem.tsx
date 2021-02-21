import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'

interface IMarketCoinProps {
  ranking: number
  image: string
  name: string
  netWorth: number
}

const UserRankingItem = ({ ranking, image, name, netWorth }: IMarketCoinProps) => (
  <View style={styles.container}>
    <Text style={styles.ranking}>{ranking}</Text>
    <Image style={styles.image} source={{ uri: image }} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.netWorth}>${netWorth}</Text>
  </View>
)

export default UserRankingItem

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
    marginLeft: 6,
  },
  ranking: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5
  },
  name: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10
  },
  netWorth: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})
