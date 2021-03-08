import React from 'react'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface ICoinPriceGraphProps {
  priceHistory: string
}

const CoinPriceGraph = ({ priceHistory }: ICoinPriceGraphProps) => {
  const data = JSON.parse(priceHistory)

  return (
    <View>
      <LineChart
        data={{
          labels: ['-7d', '-6d', '-5d', '-4d', '-3d', '-2d', '-1d', 'now'],
          datasets: [
            {
              data,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel='$'
        yAxisSuffix='k'
        yAxisInterval={1}
        withInnerLines={false}
        chartConfig={{
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0',
            strokeWidth: '1',
            stroke: '#56DCBA',
          },
        }}
        style={{
          marginVertical: 28,
          borderRadius: 16,
        }}
      />
    </View>
  )
}

export default CoinPriceGraph
