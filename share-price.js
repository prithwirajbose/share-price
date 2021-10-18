const axios = require('axios'),
    DomParser = require('dom-parser');

var getSharePricePromiseCallback = function (config, callbackFunction, resolve, reject) {
    try {
        if (config && typeof (config.stockCode) == 'string' && typeof (config.exchageCode) == 'string') {
            var parser = new DomParser();

            var googleFinanceUrl = "https://www.google.com/finance/quote/" + config.stockCode.trim().toUpperCase() + ":" + config.exchageCode.trim().toUpperCase();
            var axiosConfig = config;
            var defaultHeaders = {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "user-agent": "Axios",
                "keep-alive": "true",
                "cache-control": "no-cache"
            }
            axiosConfig.headers = ((typeof (axiosConfig.headers) == 'object') ? axiosConfig.headers : {});
            axiosConfig.headers = Object.assign(axiosConfig.headers, defaultHeaders);
            axiosConfig.url = googleFinanceUrl;
            axiosConfig.method = "get";

            axios.get(googleFinanceUrl, axiosConfig).then(function (response) {
                if (response && response.status === 200) {
                    var dom = parser.parseFromString(response.data);
                    var sharePrice = dom.getElementsByClassName('fxKbKc')[0].innerHTML.trim();
                    if (typeof (callbackFunction) == "function") {
                        callbackFunction(sharePrice, undefined);
                    }
                    return resolve(sharePrice);
                }
                else {
                    if (typeof (callbackFunction) == "function") {
                        callbackFunction(undefined, "Google Finance didn't return a HTTP 200 response");
                    }
                    return reject("Google Finance didn't return a HTTP 200 response");
                }
            }).catch(function (err) {
                if (typeof (callbackFunction) == "function") {
                    callbackFunction(undefined, err);
                }
            });
        }
        else {
            throw "stockCode and exchageCode configs are required";
        }
    }
    catch (e) {
        if (typeof (callbackFunction) == "function") {
            callbackFunction(undefined, e);
        }
        return reject(e);
    }
};

var getSharePrice = function (config, callbackFunction) {
    return new Promise(function (resolve, reject) {
        return getSharePricePromiseCallback(config, callbackFunction, resolve, reject);
    });
};

module.exports.getSharePrice = getSharePrice;
