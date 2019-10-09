const fs = require('fs')

function readFile(path) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path, (e, buf) => {
      if (e) reject(e)
      else {
        const str = buf.toString()
        const data = str.split(/\r?\n/g)
        if (data[data.length-1] == '') data.pop()
        resolve(data)
      }
    })
  })
  return promise
}

async function getWhitelist() {
  const data = await readFile('whitelist')
  const list = []
  for (const x of data) if (x.split('.').length == 4) list.push(x)
  return list
}

exports.getWhitelist = getWhitelist

async function getValue(key) {
  const data = await readFile('store')
  const store = {}
  for (let x of data) {
    x = x.replace(/ /g, '')
    const pair = x.split(':')
    if (pair.length == 2 && pair[0] == key) return pair[1]
  }
  return null
}

exports.getValue = getValue
