const axios = require('axios');

var getStockSymbolPromiseCallback = function(config, callbackFunction, resolve, reject) {
    try {
        if (config && typeof(config.stockName) == 'string') {

            var yahooFinanceQuoteUrl = "https://query2.finance.yahoo.com/v1/finance/search?q=" + encodeURIComponent(config.stockName.trim()) + "&lang=en-US&region=US&quotesCount=6&newsCount=2&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true&enableResearchReports=true&researchReportsCount=2";
            var axiosConfig = config;
            var defaultHeaders = {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "user-agent": "Axios",
                "keep-alive": "true",
                "cache-control": "no-cache"
            }
            axiosConfig.headers = ((typeof(axiosConfig.headers) == 'object') ? axiosConfig.headers : {});
            axiosConfig.headers = Object.assign(axiosConfig.headers, defaultHeaders);
            axiosConfig.url = yahooFinanceQuoteUrl;
            axiosConfig.method = "get";

            axios.get(yahooFinanceQuoteUrl, axiosConfig).then(function(response) {
                if (response && response.status === 200 && response.data && response.data.quotes && Array.isArray(response.data.quotes) &&
                    response.data.quotes.length > 0) {

                    var stockSearchResults = response.data.quotes;
                    var stockSymbol = null;
                    var stockResults = [];
                    for (var i = 0; i < stockSearchResults.length; i++) {
                        if (stockSearchResults[i].quoteType == "EQUITY") {
                            if (typeof(config.list) == 'boolean' && config.list === true) {
                                stockResults.push({
                                    "exchange": stockSearchResults[i].exchange,
                                    "name": stockSearchResults[i].longname,
                                    "stockSymbol": stockSearchResults[i].symbol
                                });
                            } else {
                                stockSymbol = stockSymbol == null ? stockSearchResults[i].symbol : stockSymbol;
                                if (stockSymbol != null) {
                                    break;
                                }
                            }
                        }
                    }

                    var finalResult = (typeof(config.list) == 'boolean' && config.list === true) ? stockResults : stockSymbol;

                    if (typeof(callbackFunction) == "function") {
                        callbackFunction(finalResult, undefined);
                    }
                    return resolve(finalResult);
                } else {
                    if (typeof(callbackFunction) == "function") {
                        callbackFunction(undefined, "Backend Service didn't return a HTTP 200 response");
                    }
                    return reject("Backend Service didn't return a HTTP 200 response");
                }
            }).catch(function(err) {
                if (typeof(callbackFunction) == "function") {
                    callbackFunction(undefined, err);
                }
            });
        } else {
            throw "stockName config is required";
        }
    } catch (e) {
        if (typeof(callbackFunction) == "function") {
            callbackFunction(undefined, e);
        }
        return reject(e);
    }
};

var getSharePricePromiseCallback = function(config, callbackFunction, resolve, reject) {
    try {
        if (config && typeof(config.stockSymbol) == 'string') {

            var yahooFinanceQuoteUrl = "https://query1.finance.yahoo.com/v8/finance/chart/" + config.stockSymbol.trim().toUpperCase() + "?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";
            var axiosConfig = config;
            var defaultHeaders = {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "user-agent": "Axios",
                "keep-alive": "true",
                "cache-control": "no-cache"
            }
            axiosConfig.headers = ((typeof(axiosConfig.headers) == 'object') ? axiosConfig.headers : {});
            axiosConfig.headers = Object.assign(axiosConfig.headers, defaultHeaders);
            axiosConfig.url = yahooFinanceQuoteUrl;
            axiosConfig.method = "get";

            axios.get(yahooFinanceQuoteUrl, axiosConfig).then(function(response) {
                if (response && response.status === 200 && response.data && response.data.chart && response.data.chart.result &&
                    Array.isArray(response.data.chart.result) && response.data.chart.result.length > 0 &&
                    response.data.chart.result[0].meta && typeof(response.data.chart.result[0].meta.regularMarketPrice) == 'number') {

                    var sharePrice = response.data.chart.result[0].meta.regularMarketPrice;
                    if (typeof(callbackFunction) == "function") {
                        callbackFunction(sharePrice, undefined);
                    }
                    return resolve(sharePrice);
                } else {
                    if (typeof(callbackFunction) == "function") {
                        callbackFunction(undefined, "Backend Service didn't return a HTTP 200 response");
                    }
                    return reject("Backend Service didn't return a HTTP 200 response");
                }
            }).catch(function(err) {
                if (typeof(callbackFunction) == "function") {
                    callbackFunction(undefined, err);
                }
            });
        } else {
            throw "stockSymbol config is required";
        }
    } catch (e) {
        if (typeof(callbackFunction) == "function") {
            callbackFunction(undefined, e);
        }
        return reject(e);
    }
};

var getStockSymbol = function(config, callbackFunction) {
    return new Promise(function(resolve, reject) {
        return getStockSymbolPromiseCallback(config, callbackFunction, resolve, reject);
    });
};

var getSharePrice = function(config, callbackFunction) {
    return new Promise(function(resolve, reject) {
        return getSharePricePromiseCallback(config, callbackFunction, resolve, reject);
    });
};

module.exports.getStockSymbol = getStockSymbol;
module.exports.getSharePrice = getSharePrice;