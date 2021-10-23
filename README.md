# share-price
NPM library to get realtime Share / Stock Price from Yahoo Finance Website. This library uses axios under the hood to make HTTP Call to Yahoo Finance. 

## Functions

- [getSharePrice(config, callbackFunction(sharePrice, error))](#function-getStocksymbol(config,-callbackfunction(sharePrice,-error)))
- getStockSymbol(config, callbackFunction(sharePrice, error))

## Function getSharePrice(config, callbackFunction(sharePrice, error))

`stockSymbol` is a mandatory property for `config` parameter of `getSharePrice(config, callbackFunction(sharePrice, error))` function. Please refer [Yahoo Finance Disclaimer page](https://www.google.com/googlefinance/disclaimer/) for the Exchange Codes. Stock Codes are the standard stock codes / symbols /scrip names issued by Stock Exchanges for each of the listed Companies. You must pass valid values for the 2 config properties, otherwise the library function will retun error.
You can optionally use any of the [axios request config](https://www.npmjs.com/package/axios#request-config) along with `stockName` and `exchageCode`

If you are using the library behind a coporate proxy please refer axios request config properties link on how to set your proxy settings.

### Usage
```js
var sharePrice = require("share-price");
//Using a Promise.
sharePrice.getSharePrice({ stockSymbol: "AAPL", exchageCode: "NASDAQ" }).then(function(stockPrice) {
    console.log(stockPrice);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getSharePrice({ stockSymbol: "AAPL", exchageCode: "NASDAQ" }, function(stockPrice, error) {
    if (error) {
        console.error(error);
    } else {
        console.log(stockPrice);
    }
});
```

## Function getStockSymbol(config, callbackFunction(sharePrice, error))

`stockSymbol` is a mandatory property for `config` parameter of `getStockSymbol(config, callbackFunction(sharePrice, error))` function. Please refer [Yahoo Finance Disclaimer page](https://www.google.com/googlefinance/disclaimer/) for the Exchange Codes. Stock Codes are the standard stock codes / symbols /scrip names issued by Stock Exchanges for each of the listed Companies. You must pass valid values for the 2 config properties, otherwise the library function will retun error.
You can optionally use any of the [axios request config](https://www.npmjs.com/package/axios#request-config) along with `stockName` and `exchageCode`

If you are using the library behind a coporate proxy please refer axios request config properties link on how to set your proxy settings.

### Usage
```js
var sharePrice = require("share-price");
//Using a Promise.
sharePrice.getStockSymbol({ stockSymbol: "AAPL", exchageCode: "NASDAQ" }).then(function(stockPrice) {
    console.log(stockPrice);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getStockSymbol({ stockSymbol: "AAPL", exchageCode: "NASDAQ" }, function(stockPrice, error) {
    if (error) {
        console.error(error);
    } else {
        console.log(stockPrice);
    }
});
```

## Future Enhancements
This library currenctly doesn't support searching a Company by it's name and finding which stock exchange it is listed to and with what stock code / symbol / scrip name. I'm working on implementing that feature.

