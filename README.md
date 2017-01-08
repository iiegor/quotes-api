# quotes-api

> A Node.js financial quotes API

See it running: [https://finance-quotes.herokuapp.com/](https://finance-quotes.herokuapp.com/)

## Endpoints

#### ``/streamer`` - Real-time quotes using chunked transfer encoding

##### Parameters

- symbols
- params
- region *(optional)* - *[default: US]*
- lang *(optional)* - *[default: en-US]*

##### Response

There is no unique response, to handle it you should iterate trough the response data or similar, ([see](https://github.com/iiegor/quotes-api/blob/master/index.js#L59)).

Each chunk is sent as an array of stringified JSON objects (can contain multiple quotes).

##### Usage example

``/streamer?symbols=EURUSD=X,A,E,^IBEX,XLF,AAPL,FB,BAC,JCP,FTR,NYRT,F&params=l84,c63,p43&region=ES&lang=es-ES`` - [demo](https://finance-quotes.herokuapp.com/streamer?symbols=EURUSD=X,A,E,^IBEX,XLF,AAPL,FB,BAC,JCP,FTR,NYRT,F&params=l84,c63,p43&region=ES&lang=es-ES)

## License

MIT © [Iegor Azuaga](https://github.com/iiegor)
