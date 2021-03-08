export type RootStackParamList = {
  Welcome: undefined
  Root: undefined
  NotFound: undefined
  CoinDetails: { id: string }
  CoinExchange: { isBuy: boolean; coin: any, portfolioCoin: any }
}

export type BottomTabParamList = {
  Home: undefined
  Portfolio: undefined
  Market: undefined
  Rankings: undefined
  Profile: undefined
}
