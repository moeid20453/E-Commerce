const app = require('express').Router()
const product = require('../modules/product/Product.repo')
const upload = require('../middleware/upload')


app.post('/create',upload.single('image'), product.create);
app.post('/product', product.getSingleProduct);
app.get('/get', product.getAll);
app.get('/count', product.countAll)


module.exports = app;