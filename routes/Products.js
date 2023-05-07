const app =  require('express').Router();
const auth = require("../middleware/authentication");
const product = require('../controllers/Prod')
const upload = require("../middleware/upload")
const { getSingleProductReviews } = require("../controllers/Review")

 app.get('/', product.getAllProducts);
// app.post('/createProduct',[auth.authenticateUser,auth.authorizePermissions('admin')], product.createProduct);
app.post('/createProduct', upload.single('image'), product.createProduct);

app.get('/:id',product.getSingleProduct)
app.patch('/:id',[auth.authenticateUser, auth.authorizePermissions('admin')], product.updateProduct)
app.delete('/:id',[auth.authenticateUser, auth.authorizePermissions('admin')], product.deleteProduct)

app.get('/:id/reviews', getSingleProductReviews)

module.exports = app;
