const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Define the route for /category (GET and POST)
router.route('/category')
  .get(categoryCtrl.getCategories) // Fetch all categories
  .post(auth, authAdmin, categoryCtrl.createCategory); // Create a new category with admin auth

// Define the route for /category/:id (DELETE)
router.route('/category/:id')
  .delete(auth, authAdmin, categoryCtrl.deleteCategory) // Delete a category by ID with admin auth
  .put(auth, authAdmin, categoryCtrl.updateCategory); // Update a category by ID with admin auth

module.exports = router; // Export the router
