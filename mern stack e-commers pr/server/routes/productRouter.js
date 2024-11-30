const router = require('express').Router();
const productCtrl = require('../controllers/productCtr')


// Define route for '/products' - handling GET and POST requests
router.route('/products')
  .get((req, res) => {
    // Your logic for getting products
    res.json({ msg: 'Get products' });
  })
  .post((req, res) => {
    // Your logic for creating a new product
    res.json({ msg: 'Create product' });
  });

// Define route for '/products/:id' - handling DELETE and PUT requests
router.route('/products/:id')
  .delete((req, res) => {
    // Your logic for deleting a product by ID
    res.json({ msg: 'Delete product' });
  })
  .put((req, res) => {
    // Your logic for updating a product by ID
    res.json({ msg: 'Update product' });
  });

module.exports = router;  // Export the router
