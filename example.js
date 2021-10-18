var sharePrice = require("./share-price");
//Using a Promise.
sharePrice.getSharePrice({ stockCode: "AAPL", exchageCode: "NASDAQ" }).then(function (sharePrice) {
    console.log(sharePrice);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getSharePrice({ stockCode: "AAPL", exchageCode: "NASDAQ" }, function (sharePrice, e) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(sharePrice);
    }
});