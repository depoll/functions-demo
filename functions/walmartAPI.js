module.exports = {
	findPrices : findPrices,
	findPriceRange : findPriceRange
}

WALMART_API_KEY = ''

function findPrices(item, callback) {
	console.log('findPrice: begin request for ' + item);
	const request = require('request')
     ,url = 'http://api.walmartlabs.com/v1/search?apiKey=' + WALMART_API_KEY + '&query=' + item

  request(url, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      const response = JSON.parse(body);
			results = []
	  	if (response.items) {
				for (var index = 0; index < response.items.length; index++) {
					var name = response.items[index].name;
					var price = response.items[index].salePrice;
					results.push([name, price])
					console.log('findPrice: found ' + name + ' for $' + price);
				}
				console.log('findPrice: found ' + results.length + ' results');
				callback(results);
	  	}
    } else {
      console.log("findPrice: error: ", error, ", status code: ", response.statusCode)
			callback(null);
    }
  })
}

function findPriceRange(item, callback) {
	findPrices(item, (results) => {
		var minimumPrice = Number.MAX_SAFE_INTEGER
		var maximumPrice = 0
		if (results) {
			for (var index = 0; index < results.length; index++) {
				price = results[index][1];
				minimumPrice = Math.min(minimumPrice, price)
				maximumPrice = Math.max(maximumPrice, price)
			}
		}
		callback(minimumPrice, maximumPrice)
	});
}