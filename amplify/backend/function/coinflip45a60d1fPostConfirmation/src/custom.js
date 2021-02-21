const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log('Error: No User was written to DynamoDB.')
    return context.done(null, event)
  }

  const data = new Date()

  const UserItem = {
    id: { S: event.request.userAttributes.sub },
    __typename: { S: 'User' },
    email: { S: event.request.userAttributes.email },
    networth: { N: '100000' },
    createdAt: { S: data.toISOString() },
    updatedAt: { S: data.toISOString() },
  }

  if (event.request.userAttributes.name) {
    UserItem.name = { S: event.request.userAttributes.name }
  }

  if (event.request.userAttributes.picture) {
    UserItem.image = { S: event.request.userAttributes.picture }
  }

  try {
    await ddb.putItem({ Item: UserItem, TableName: process.env.USER_TABLE }).promise()
    console.log('Success:CreatedUser')
  } catch (err) {
    console.log('Error:User', err)
  }

  const PortfolioCoinItem = {
    id: { S: `${event.request.userAttributes.sub}-usd` },
    __typename: { S: 'PortfolioCoin' },
    amount: { N: '100000' },
    userId: { S: event.request.userAttributes.sub },
    coinId: { S: process.env.USD_COIN_ID },
    createdAt: { S: data.toISOString() },
    updatedAt: { S: data.toISOString() },
  }

  try {
    await ddb.putItem({ Item: PortfolioCoinItem, TableName: process.env.PORTFOLIO_COIN_TABLE }).promise()
    console.log('Success:CreatedPortfolioCoin')
  } catch (err) {
    console.log('Error:PortfolioCoin', err)
  }

  context.done(null, event)
}
