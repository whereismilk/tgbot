const http = require('http')
const https = require('https')

module.exports = {
  getCurrentPrice: money => new Promise(resolve => {
    https.get('https://cex.io/api/last_price/BTC/' + money, res => {
      res.on('data', d => {
        resolve(JSON.parse(d.toString()))
      })
    })
  })
}
