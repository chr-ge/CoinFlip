const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log('Error: No User was written to DynamoDB')
    return context.done(null, event)
  }

  const data = new Date()

  const Item = {
    id: { S: event.request.userAttributes.sub },
    __typename: { S: 'User' },
    email: { S: event.request.userAttributes.email },
    networth: { N: '100000' },
    createdAt: { S: data.toISOString() },
    updatedAt: { S: data.toISOString() },
  }

  if (event.request.userAttributes.name) {
    Item.image = { S: event.request.userAttributes.name }
  }

  if (event.request.userAttributes.picture) {
    Item.image = { S: event.request.userAttributes.picture }
  }

  const params = { Item, TableName: process.env.USERTABLE }

  try {
    await ddb.putItem(params).promise()
    console.log('Success')
  } catch (err) {
    console.log('Error', err)
  }

  context.done(null, event)
}
