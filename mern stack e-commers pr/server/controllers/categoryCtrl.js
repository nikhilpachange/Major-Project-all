const Category = require('../models/categoryModel'); // Import the correct model

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find(); // Fetch all categories from the DB
            res.json(categories); // Send the fetched categories as a response
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name } = req.body; // Extract the category name from the request body
            
            // Check if the category already exists
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ msg: "Category already exists" });
            }

            // Create and save the new category
            const newCategory = new Category({ name });
            await newCategory.save();

            res.json({ msg: 'Category created successfully', category: newCategory }); // Send success response
        } catch (err) {
            return res.status(500).json({ msg: err.message }); // Handle errors
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) {
                return res.status(404).json({ msg: "Category not found" });
            }
            res.json({ msg: "Category deleted successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message }); // Handle errors
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { name } = req.body; // Get the new category name from the request body
            
            // Update the category by ID
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id, // Find the category by its ID
                { name }, // Update the name field
                { new: true } // Return the updated category document
            );

            if (!updatedCategory) {
                return res.status(404).json({ msg: "Category not found" });
            }

            res.json({ msg: "Category updated successfully", category: updatedCategory }); // Send success response
        } catch (err) {
            return res.status(500).json({ msg: err.message }); // Handle errors
        }
    }
};

module.exports = categoryCtrl; // Export the controller
