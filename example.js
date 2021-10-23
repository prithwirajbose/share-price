var sharePrice = require("./share-price.js");
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

//Using a Promise.
sharePrice.getStockSymbol({ stockName: "Apple Inc", list: true }).then(function(StockSymbol) {
    console.log(StockSymbol);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getStockSymbol({ stockName: "Apple Inc" }, function(stockPrice, error) {
    if (error) {
        console.error(error);
    } else {
        console.log(stockPrice);
    }
});