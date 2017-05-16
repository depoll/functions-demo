const functions = require('firebase-functions');
const admin = require('firebase-admin');
const api = require('./walmartAPI');

admin.initializeApp(functions.config().firebase);

exports.addItem = functions.https.onRequest((req, res) => {
  const item = req.query.text;
  admin.database().ref('/wishlist').push({item: item}).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
});

exports.findPrice = functions.database.ref('/wishlist/{pushId}/item')
		.onWrite(event => {
			const item = event.data.val();
			api.findPriceRange(item, function(minimumPrice, maximumPrice) {
				range = "$" + minimumPrice + " - $" + maximumPrice;
				event.data.ref.parent.child('price').set(range);
			});
			return event.data.ref.parent.child('price').set('retrieving');
		});
