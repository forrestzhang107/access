const files = require('./files')

function sls(service) {
  return async function (event) {
      try {
      const payload = event.queryStringParameters || {}
      const sourceIp = event.requestContext.identity.sourceIp
      const whitelist = await files.getWhitelist()
      const ipList = Object.keys(whitelist)
      const isAuthenticated = ipList.includes(sourceIp)
      payload.sourceIp = sourceIp
      payload.isAuthenticated = isAuthenticated
      const data = await service(payload)
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    }
    catch (e) {
      return {
        statusCode: 500,
        body: e.message
      }
    }
  }
}

function db(service) {
  return async function (payload) {
    await mongo.init()
    return await service(payload)
  }
}

function index() {
  return 'Welcome to access.'
}

module.exports.index = sls(index)

function isAuthenticated(payload) {
  return payload.isAuthenticated
}

module.exports.isAuthenticated = sls(isAuthenticated)

function getSourceIp(payload) {
  return payload.sourceIp
}

module.exports.getSourceIp = sls(getSourceIp)

async function getValue(payload) {
  if (!payload.isAuthenticated) throw new Error('Unauthorized')
  return await files.getValue(payload.key)
}

module.exports.getValue = sls(getValue)

async function getValues(payload) {
  const keys = payload.keys.split(',')
  if (!payload.isAuthenticated) throw new Error('Unauthorized')
  return await files.getValues(keys)
}

module.exports.getValues = sls(getValues)
