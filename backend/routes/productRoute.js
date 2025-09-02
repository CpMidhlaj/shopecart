const express = require("express");
const { getAllProducts, addProduct, editProduct, deleteProduct } = require("../controllers/productControl");
const { userAuth, userAuthorization } = require("../middleware/userAuth");
const upload = require("../middleware/fileUpload");

const router = express.Router();

router.route('/all').get(userAuth,userAuthorization(['admin']),getAllProducts);
router.route('/add').post(userAuth,upload.array('productPhotos'),userAuthorization(['admin']),addProduct);
router.route('/edit-product/:id').put(userAuth,userAuthorization(['admin']),editProduct);
router.route('/delete-product/:id').delete(userAuth,userAuthorization(['admin']),deleteProduct);

module.exports = router