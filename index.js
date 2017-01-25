const express = require('express')
const http = require('http')
const querystring = require('querystring')
const pkg = require('./package')
const { endpoints } = require('./config')
const { satisfaces, parseChunk } = require('./utils')

const PORT = process.env.PORT || 8080
const app = express()

app.get('/', (req, res) => res.end(`${pkg.name}@${pkg.version} - ${parseInt(process.uptime())}s`))

/**
 * Stream endpoint
 * @example /streamer?symbols=EURUSD=X,A,E,^IBEX,XLF,AAPL,FB,BAC,JCP,FTR,NYRT,F&params=l84,c63,p43&region=ES&lang=es-ES
 */
app.get('/streamer', (req, res, next) => {
  if (satisfaces(req.query, ['symbols', 'params'])) {
    const { symbols, params, region, lang } = req.query

    // @info Write request head
    res.writeHead(200, {
      'Age': 0,
      'Cache-Control': 'private',
      'Connection': 'keep-alive',
      'Transfer-Encoding': 'chunked'
    })
    
    // @info Make the request
    const request = http.request({
      method: 'GET',
      hostname: endpoints.streamer.host,
      port: 80,
      path: endpoints.streamer.path + '?' + querystring.stringify({
        s: symbols,
        k: params,
        callback: 'parent.yfs_u1f',
        mktmcb: 'parent.yfs_mktmcb',
        gencallback: 'parent.yfs_gencb',
        mu: 1,
        ts: Date.now(),
        region: region || 'US',
        lang: lang || 'en-US'
      }).replace(/%2C/g, ',').replace(/%5E/g, "^").replace(/%3D/g, "="),
      headers: {
        'host': endpoints.streamer.host,
        'Accept': '*/*',
        'Accept-Language': 'es,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch, br',
        'Connection': 'keep-alive',
        'Referer': 'http://finance.yahoo.com/quote/AAPL?p=AAPL'
      }
    })
    request.end()

    // @info Receive, parse and stream the chunked data
    request.on('response', (response) => {
      response.setEncoding('utf8')
      response.on('data', (chunk) => {
        const data = parseChunk(chunk)

        if (data) {
          res.write(data)
        }
      })

      // @info Abort the streaming if the request was closed
      req.on('close', () => {
        request.abort()
      })
    })

    // @info Notify the user about any request related error
    request.on('error', () => {
      res.end('Resource not available')
    })
  } else {
    next()
  }
})

/** @info Exception handler */
app.use((req, res) => {
  res.json({error: 1})
})

app.listen(PORT, () => console.log(`Listening at :${PORT}`))
