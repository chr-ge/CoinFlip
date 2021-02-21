const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = (event, context) => {
  if(!event.request.userAttributes.sub) {
    console.log("Error: No User was written to DynamoDB")
    return context.done(null, event)
  }

  const data = new Date()

  const params = {
    Item: {
      'id': { S: event.request.userAttributes.sub },
      '__typename': { S: 'User' },
      'email': { S: event.request.userAttributes.email },
      'name': { S: event.request.userAttributes.name },
      'image': { S: event.request.userAttributes.image },
      'netWorth': { D: '100000.00' },
      'createdAt': { S: data.toISOString() },
      'updatedAt': { S: data.toISOString() },
    },
    TableName: process.env.USERTABLE
  }

  try {
    await ddb.putItem(params).promise()
    console.log('Success')
  } catch(err) {
    console.log('Error', err)
  }

  context.done(null, event)
}
