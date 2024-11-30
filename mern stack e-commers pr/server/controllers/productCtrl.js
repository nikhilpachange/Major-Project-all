const Product = require('../models/productModel'); // Import the product model

// Filtering, sorting, and pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString }; // Create a shallow copy of queryString
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]); // Remove fields used for other features

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => `$${match}`); // Add MongoDB operators

        this.query = this.query.find(JSON.parse(queryStr)); // Apply filtering to the query
        return this; // Return `this` for method chaining
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' '); // Convert `sort` string to MongoDB format
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // Default sort by createdAt descending
        }
        return this;
    }

    pagination() {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit); // Apply pagination
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Product.find(), req.query)
                .filtering()
                .sorting()
                .pagination();

            const products = await features.query; // Execute the query with all features applied
            res.json({
                status: 'success',
                results: products.length,
                products
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;

            // Check if the product already exists
            const existingProduct = await Product.findOne({ product_id });
            if (existingProduct) {
                return res.status(400).json({ msg: "Product already exists" });
            }

            // Create a new product
            const newProduct = new Product({
                product_id,
                title,
                price,
                description,
                content,
                images,
                category
            });

            await newProduct.save();
            res.json({ msg: "Product created successfully", product: newProduct });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ msg: "Product not found" });
            }
            res.json({ msg: "Product deleted successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                { title, price, description, content, images, category },
                { new: true } // Return the updated product
            );

            if (!product) {
                return res.status(404).json({ msg: "Product not found" });
            }

            res.json({ msg: "Product updated successfully", product });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = productCtrl; // Correctly export the controller
