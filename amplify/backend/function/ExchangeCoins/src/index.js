/* Amplify Params - DO NOT EDIT
	API_COINFLIP_GRAPHQLAPIENDPOINTOUTPUT
	API_COINFLIP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { DynamoDB } = require('aws-sdk')

const ddb = new DynamoDB()

const getCoinAmount = async (coinPortfolioCoinId, userId) => {
  const params = {
    TableName: process.env.PORTFOLIO_COIN_TABLE,
    Key: {
      id: { S: coinPortfolioCoinId },
    },
  }
  const coinData = await ddb.getItem(params).promise()
  if (coinData && coinData.Item && coinData.Item.amount) {
    return parseFloat(coinData.Item.amount.N)
  }
  return 0
}

const getUSDAmount = async (usdPortfolioCoinId, userId) => {
  const params = {
    TableName: process.env.PORTFOLIO_COIN_TABLE,
    Key: {
      id: { S: usdPortfolioCoinId },
    },
  }
  const coinData = await ddb.getItem(params).promise()
  if (coinData && coinData.Item && coinData.Item.amount) {
    return parseFloat(coinData.Item.amount.N)
  }
  return 0
}

const getCoin = async (coinId) => {
  const params = {
    TableName: process.env.COIN_TABLE,
    Key: {
      id: { S: coinId },
    },
  }
  return await ddb.getItem(params).promise()
}

const canBuyCoin = (currentPrice, amount, usdAmount) => {
  return usdAmount >= currentPrice * amount
}

const canSellCoin = (amount, portfolioAmount) => {
  return portfolioAmount >= amount
}

const buyCoin = async (
  coin,
  amount,
  usdAmount,
  coinAmount,
  usdPortfolioCoinId,
  userId
) => {
  const date = new Date()

  const newUSDAmount = usdAmount - parseFloat(coin.Item.currentPrice.N) * amount
  const params = {
    TableName: process.env.PORTFOLIO_COIN_TABLE,
    Item: {
      id: { S: usdPortfolioCoinId },
      __typename: { S: 'PortfolioCoin' },
      amount: { N: newUSDAmount.toString() },
      userId: { S: userId },
      coinId: { S: process.env.USD_COIN_ID },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
  }
  await ddb.putItem(params).promise()

  const newCoinAmount = coinAmount + amount
  const params1 = {
    TableName: process.env.PORTFOLIO_COIN_TABLE,
    Item: {
      id: { S: `${userId}-${coin.Item.symbol.S}` },
      __typename: { S: 'PortfolioCoin' },
      amount: { N: newCoinAmount.toString() },
      userId: { S: userId },
      coinId: { S: coin.Item.id.S },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
  }
  await ddb.putItem(params1).promise()
}

const sellCoin = async (
  coin,
  amount,
  usdAmount,
  coinAmount,
  usdPortfolioCoinId,
  userId
) => {
  const date = new Date()

  const newUSDAmount = usdAmount + parseFloat(coin.Item.currentPrice.N) * amount
  const params = {
    TableName: process.env.PORTFOLIO_COIN_TABLE,
    Item: {
      id: { S: usdPortfolioCoinId },
      __typename: { S: 'PortfolioCoin' },
      amount: { N: newUSDAmount.toString() },
      userId: { S: userId },
      coinId: { S: process.env.USD_COIN_ID },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
  }
  await ddb.putItem(params).promise()

  const newCoinAmount = coinAmount - amount
  const params1 = {
    TableName: process.env.PORTFOLIO_COIN_TABLE,
    Item: {
      id: { S: `${userId}-${coin.Item.symbol.S}` },
      __typename: { S: 'PortfolioCoin' },
      amount: { N: newCoinAmount.toString() },
      userId: { S: userId },
      coinId: { S: coin.Item.id.S },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
  }
  await ddb.putItem(params1).promise()
}

const resolvers = {
  Mutation: {
    exchangeCoins: async (ctx) => {
      const {
        coinId,
        isBuy,
        amount,
        usdPortfolioCoinId,
        coinPortfolioCoinId,
      } = ctx.arguments
      const userId = ctx.identity.sub

      const usdAmount = !usdPortfolioCoinId
        ? 0
        : await getUSDAmount(usdPortfolioCoinId, userId)

      const coinAmount = !coinPortfolioCoinId
        ? 0
        : await getCoinAmount(coinPortfolioCoinId, userId)

      const coin = await getCoin(coinId)

      if (isBuy && canBuyCoin(coin.Item.currentPrice.N, amount, usdAmount)) {
        await buyCoin(
          coin,
          amount,
          usdAmount,
          coinAmount,
          usdPortfolioCoinId,
          userId
        )
      } else if (!isBuy && canSellCoin(amount, coinAmount)) {
        await sellCoin(
          coin,
          amount,
          usdAmount,
          coinAmount,
          usdPortfolioCoinId,
          userId
        )
      } else {
        throw new Error(isBuy ? 'Not enough USD.' : 'Not enough coins to sell.')
      }

      return true
    },
  },
}

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      return await resolver(event)
    }
  }
  throw new Error('Resolver not found.')
}
