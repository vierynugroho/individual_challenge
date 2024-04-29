const { PrismaClient } = require('@prisma/client');
const createHttpError = require('http-errors');
const prisma = new PrismaClient();

const getProducts = async (req, res, next) => {
	try {
		const search = req.query.search || '';
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = (page - 1) * limit;

		const products = await prisma.product.findMany({
			where: {
				name: {
					contains: search,
				},
			},
			orderBy: {
				name: 'asc',
			},
			skip: offset,
			take: limit,
		});

		const count = await prisma.product.count({
			where: {
				name: {
					contains: search,
				},
			},
		});

		res.status(200).json({
			status: true,
			message: 'all product data retrieved successfully',
			totalItems: count,
			pagination: {
				totalPages: Math.ceil(count / limit),
				currentPage: page,
				pageItems: products.length,
				nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
				prevPage: page > 1 ? page - 1 : null,
			},
			data: products.length !== 0 ? products : 'empty product data',
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const getProduct = async (req, res, next) => {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});

		if (!product) {
			console.log('not found');
			return next(createHttpError(404, { message: 'product not found' }));
		}

		res.status(200).json({
			status: true,
			message: 'product data retrieved successfully',
			data: product,
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

const createProduct = async (req, res, next) => {
	try {
		const { name, price } = req.body;
		const product = await prisma.product.create({
			data: {
				name: name,
				price: Number(price),
			},
		});

		res.status(201).json({
			status: true,
			message: 'product created successfully',
			data: product,
		});
	} catch (error) {
		if (error.code === 'P2002') {
			console.log('ERROR: product already exist');
			next(createHttpError(422, { message: 'product already exist' }));
		}
		next(createHttpError(500, { message: error.message }));
	}
};

const updateProduct = async (req, res, next) => {
	try {
		if (isNaN(req.params.id)) {
			return next(createHttpError(400, { message: 'id is not a number' }));
		}

		const { name, price } = req.body;

		const product = await prisma.product.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});

		if (!product) {
			return next(createHttpError(404, { message: 'product not found' }));
		}

		const productUpdated = await prisma.product.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				name: name,
				price: Number(price),
			},
		});

		res.status(201).json({
			status: true,
			message: 'product updated successfully',
			data: productUpdated,
		});
	} catch (error) {
		if (error.code === 'P2002') {
			console.log('ERROR: product already exist');
			next(createHttpError(422, { message: 'product already exist' }));
		}
		next(createHttpError(500, { message: error.message }));
	}
};

const deleteProduct = async (req, res, next) => {
	try {
		if (isNaN(req.params.id)) {
			return next(createHttpError(400, { message: 'id is not a number' }));
		}

		const product = await prisma.product.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});

		if (!product) {
			return next(createHttpError(404, { message: 'product not found' }));
		}

		await prisma.product.delete({
			where: {
				id: Number(req.params.id),
			},
		});

		res.status(201).json({
			status: true,
			message: 'product deleted successfully',
		});
	} catch (error) {
		next(createHttpError(500, { message: error.message }));
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
