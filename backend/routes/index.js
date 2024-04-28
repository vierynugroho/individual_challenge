const router = require('express').Router();

const productRoute = require('./product');

router.get('/api/v1', (req, res, next) => {
	res.status(200).json({
		status: true,
		message: 'Welcome to products API akuuuhh!',
	});
});

router.use('/api/v1/products', productRoute);

module.exports = router;
