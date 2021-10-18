var sharePrice = require("./share-price");
//Using a Promise.
sharePrice.getSharePrice({ stockCode: "RELIANCE", exchageCode: "NSE" }).then(function (sharePrice) {
    console.log(sharePrice);
}).catch((error) => {
    console.log(error);
});

//Using a callback function.
sharePrice.getSharePrice({ stockCode: "RELIANCE", exchageCode: "NSE" }, function (sharePrice, e) {
    if (e) {
        console.error(error);
    }
    else {
        console.log(sharePrice);
    }
});