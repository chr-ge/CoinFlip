import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

interface IPercentageChangeProps {
  value: number
  style?: StyleProp<TextStyle>
}

const PercentageChange = ({ value, style = {} }: IPercentageChangeProps) => (
  <Text style={[style, { color: value > 0 ? '#398F0A' : '#F10000' }]}>
    {value > 0 && '+'}{value}
  </Text>
)

export default PercentageChange
