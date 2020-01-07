const fs = require('fs')
const util = require('./utility')

function getJSON(path) {
  try {
    const buf = fs.readFileSync(path + '.json')
    return JSON.parse(buf)
  }
  catch (e) {
    return null
  }
}

function writeJSON(path, data) {
  return fs.writeFileSync(path + '.json', JSON.stringify(data, null, 3))
}

function getWhitelist() {
  let whitelist = getJSON('whitelist')
  return whitelist ? whitelist : {}
}

exports.getWhitelist = getWhitelist

function addIP(ip, description) {
  if (ip.split('.').length != 4) return console.log('IP ' + ip + ' is invalid')
  if (!description) return console.log('Please enter a valid description.')
  const whitelist = getWhitelist()
  const ipList = Object.keys(whitelist)
  if (ipList.includes(ip)) return console.log('IP ' + ip + ' already exists in whitelist')
  whitelist[ip] = description
  writeJSON('whitelist', whitelist)
  console.log('successfully added IP ' + ip + ' to whitelist')
}

exports.addIP = addIP

function removeIP(ip) {
  const whitelist = getWhitelist()
  const ipList = Object.keys(whitelist)
  if (!ipList.includes(ip)) return console.log('IP ' + ip + ' not found in whitelist')
  delete whitelist[ip]
  writeJSON('whitelist', whitelist)
  console.log('successfully removed IP ' + ip + ' from whitelist')
}

exports.removeIP = removeIP

function getStore() {
  let store = getJSON('store')
  if (!store) store = {}
  return store
}

exports.getStore = getStore

function addCredential(key, value) {
  const store = getStore()
  if (Object.keys(store).includes(key)) return console.log('key ' + key + ' already exists in store')
  store[key] = value
  writeJSON('store', store)
  console.log('successfully added key ' + key + ' to store')
}

exports.addCredential = addCredential

function removeCredential(key) {
  const store = getStore()
  if (!Object.keys(store).includes(key)) return console.log('key ' + key + ' not found in store')
  delete store[key]
  writeJSON('store', store)
  console.log('successfully removed key ' + key + ' from store')
}

exports.removeCredential = removeCredential

function getValue(key) {
  const store = getStore()
  return getValueFromStore(key, store)
}

exports.getValue = getValue

function getValueFromStore(key, store) {
  for (const x in store) if (x == key) return store[key]
  throw new Error('key ' + key + ' not found in store')
}

function getValues(keys) {
  const store = getStore()
  const res = {}
  for (const key of keys) {
    const value = getValueFromStore(key, store)
    res[key] = value
  }
  return res
}

exports.getValues = getValues
