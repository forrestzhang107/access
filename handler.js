const files = require('./files')

function sls(service) {
  return async function (event) {
      try {
      const payload = event.queryStringParameters || {}
      const sourceIp = event.requestContext.identity.sourceIp
      const whitelist = await files.getWhitelist()
      const isAuthenticated = whitelist.includes(sourceIp)
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

function isAuthenticated(payload) {
  return payload.isAuthenticated
}

function getSourceIp(payload) {
  return payload.sourceIp
}

async function getValue(payload) {
  if (!payload.isAuthenticated) throw new Error('Unauthorized')
  return await files.getValue(payload.key)
}

module.exports.index = sls(index)
module.exports.isAuthenticated = sls(isAuthenticated)
module.exports.getSourceIp = sls(getSourceIp)
module.exports.getValue = sls(getValue)
