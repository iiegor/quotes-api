# quotes-api

> A Node.js financial quotes API

See it running at: [https://finance-quotes.herokuapp.com/](https://finance-quotes.herokuapp.com/)

## Endpoints

#### ``/streamer`` -> Real-time quotes using chunked transferring

##### Parameters

- symbols
- params
- region *(optional)*
- lang *(optional)*

##### Usage example

``/streamer?symbols=EURUSD=X,A,E,^IBEX,XLF,AAPL,FB,BAC,JCP,FTR,NYRT,F&params=l84,c63,p43&region=ES&lang=es-ES`` - [demo](https://finance-quotes.herokuapp.com/streamer?symbols=EURUSD=X,A,E,^IBEX,XLF,AAPL,FB,BAC,JCP,FTR,NYRT,F&params=l84,c63,p43&region=ES&lang=es-ES)

## License

MIT © [Iegor Azuaga](https://github.com/iiegor)
