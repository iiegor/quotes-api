const { parameters } = require('./config')

exports.satisfaces = (target, required) => {
  return required.filter((key) => {
    return target.hasOwnProperty(key)
  }).length == required.length
}

exports.parseChunk = (data) => {
  if (data.indexOf('<html>') > -1) {
    return null
  } else {
    const list = data.split('</script>')
    const combinedQuotes = []

    const yfs_mktmcb = (data) => data,
      yfs_u1f = (data) => data,
      yfs_gencb = (data) => data

    list.forEach((item) => {
      item = item.replace('<script>try{parent.', '')
      item = item.replace('}catch(e){}', '')

      let quote = eval(item)

      if (quote) {
        combinedQuotes.push(quote)
      }
    })

    return JSON.stringify(combinedQuotes)
  }
}
