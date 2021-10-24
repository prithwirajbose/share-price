var sharePrice = require("./share-price.js");
//Using a Promise.
sharePrice.getSharePrice({ stockSymbol: "AAPL" }).then(function(stockPrice) {
    console.log(stockPrice);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getSharePrice({ stockSymbol: "AAPL" }, function(stockPrice, error) {
    if (error) {
        console.error(error);
    } else {
        console.log(stockPrice);
    }
});

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