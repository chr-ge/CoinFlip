const https = require('https')
const { DynamoDB } = require('aws-sdk')

const ddb = new DynamoDB()

const URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2Cethereum%2Ctether%2Cmonero%2Cdogecoin%2Clitecoin%2Cbinancecoin%2Cpolkadot%2Cstellar%2Ccrypto-com-chain%2Ccosmos%2Ciota&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'

const getCoinData = () => {
  return new Promise((resolve, reject) => {
    https
      .get(URL, (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', async () => {
          const jsonData = JSON.parse(data)
          resolve(jsonData)
        })
      })
      .on('error', (err) => {
        console.log(err)
        reject(err)
      })
  })
}

exports.handler = async (event, context) => {
  const data = await getCoinData()

  const date = new Date()

  const Items = data.map((item) => ({
    id: { S: item.id },
    cgId: { S: item.id },
    createdAt: { S: date.toISOString() },
    updatedAt: { S: date.toISOString() },
    currentPrice: { N: item.current_price.toString() },
    image: { S: item.image },
    name: { S: item.name },
    priceHistory: { S: JSON.stringify(item.sparkline_in_7d.price) },
    symbol: { S: item.symbol.toUpperCase() },
    valueChange1H: {
      S: item.price_change_percentage_1h_in_currency.toString(),
    },
    valueChange1D: {
      S: item.price_change_percentage_24h_in_currency.toString(),
    },
    valueChange7D: {
      S: item.price_change_percentage_7d_in_currency.toString(),
    },
  }))

  try {
    await Promise.all(
      Items.map((Item) => {
        const params = {
          TableName: process.env.COIN_TABLE,
          Item,
        }
        return ddb.putItem(params).promise()
      })
    )
  } catch (err) {
    console.log(err)
    context.done(null, event)
  }
  context.done(null, event)
}
