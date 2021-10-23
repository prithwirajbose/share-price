# share-price
NPM library to get realtime Share / Stock Price from Yahoo Finance Website. This library uses axios under the hood to make HTTP Call to Yahoo Finance. 

## Functions

  - [Function getSharePrice(config, callbackFunction(sharePrice, error))](#function-getsharepriceconfig-callbackfunctionshareprice-error)
  - [Function getStockSymbol(config, callbackFunction(sharePrice, error))](#function-getstocksymbolconfig-callbackfunctionstocksymbolresult-error)

## Function getSharePrice(config, callbackFunction(sharePrice, error))

This function is used to retrieve the Share Price of a given Stock Symbol. `stockSymbol` is a mandatory property for `config` parameter of `getSharePrice(config, callbackFunction(sharePrice, error))` function. You must pass valid values for the 2 config properties, otherwise the library function will retun error. If you are not sure of the exact stockSymbol for a Company, you can use the ```getStockSymbol()``` function to search it.
You can optionally use any of the [axios request config](https://www.npmjs.com/package/axios#request-config) along with `stockName` and `exchageCode`

If you are using the library behind a coporate proxy please refer axios request config properties link on how to set your proxy settings.

### Returns

 - A ```number``` sharePrice decimal value or error

### Example
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

## Function getStockSymbol(config, callbackFunction(stockSymbolResult, error))

This function is used to search for Stock Symbols for a given Stock Name String. `stockName` is a mandatory property for `config` parameter of `getStockSymbol(config, callbackFunction(stockSymbolResult, error))` function. . You must pass valid value for the config property, otherwise the library function will retun error. Optionally you can send another config property ```list``` as boolean value ```true``` or ```false```. When ```list: true``` is sent, the function returns an array of matching Stock Symbols along with Full Company and Stock Exchange Names.
You can optionally use any of the [axios request config](https://www.npmjs.com/package/axios#request-config) along with `stockName` and `exchageCode`

If you are using the library behind a coporate proxy please refer axios request config properties link on how to set your proxy settings.

### Returns

 - A ```string``` stockSymbolResult containing only the best matched Stock symbol name if list config is not sent as ```true``` or error 
 - An ```array``` stockSymbolResult containing a list of matching Stock symbol names along with Full Company and Stock Exchange Names if list config is not sent as ```true``` or error 

### Example
```js
var sharePrice = require("share-price");
//Using a Promise retrieve list.
sharePrice.getStockSymbol({ stockName: "Apple Inc", list: true }).then(function(stockSymbolResult) {
    console.log(stockSymbolResult);
}).catch((error) => {
    console.log(error);
});

//Using a callback function rerieve best match.
sharePrice.getStockSymbol({ stockName: "Apple Inc" }, function(stockSymbolResult, error) {
    if (error) {
        console.error(error);
    } else {
        console.log(stockSymbolResult);
    }
});
```


