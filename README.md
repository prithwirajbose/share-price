# share-price
NPM library to get realtime Share / Stock Price from Google Finance Website. This library uses axios under the hood to make HTTP Call to Google Finance. 

## Parameters
`stockCode` and `exchageCode` are two mandatory properties for `config` parameter of `getSharePrice(config, callbackFunction(sharePrice, error))` function. Please refer [Google Finance Disclaimer page](https://www.google.com/googlefinance/disclaimer/) for the Exchange Codes. Stock Codes are the standard stock codes / symbols /scrip names issued by Stock Exchanges for each of the listed Companies. You must pass valid values for the 2 config properties, otherwise the library function will retun error.
You can optionally use any of the [axios request config](https://www.npmjs.com/package/axios#request-config) along with `stockCode` and `exchageCode`

If you are using the library behind a coporate proxy please refer axios request config properties link on how to set your proxy settings.

## Usage
```js
var sharePrice = require("share-price");
//Using a Promise.
sharePrice.getSharePrice({ stockCode: "AAPL", exchageCode: "NASDAQ" }).then(function (sharePrice) {
    console.log(sharePrice);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getSharePrice({ stockCode: "AAPL", exchageCode: "NASDAQ" }, function (sharePrice, e) {
    if (e) {
        console.error(error);
    }
    else {
        console.log(sharePrice);
    }
});
```

## Future Enhancements
This library currenctly doesn't support searching a Company by it's name and finding which stock exchange it is listed to and with what stock code / symbol / scrip name. I'm working on implementing that feature.

