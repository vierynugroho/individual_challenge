const express = require('express');
const router = express.Router();

const Validator = require('../middlewares/validator');
const { productSchema, updateProductSchema } = require('../utils/joi');
const { getProducts, getProduct, updateProduct, deleteProduct, createProduct } = require('../controllers/product');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', Validator(productSchema), createProduct);
router.patch('/:id', Validator(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
