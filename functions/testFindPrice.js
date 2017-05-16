var query = "iPad";
if (process.argv.length > 2) {
	query = process.argv[2];
}

api = require('./walmartAPI');
api.findPriceRange(query, (minimumPrice, maximumPrice) => {
	console.log('Minimum price: $' + minimumPrice);
	console.log('Maximum price: $' + maximumPrice);
});
