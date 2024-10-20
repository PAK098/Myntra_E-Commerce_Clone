const fs = require("fs");

// Importing product schema
const model = require("../Model/product");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");
//view
// Get all products
exports.getAllProductsSSR = async (req, res) => {
  try {
    const products = await Product.find();
    ejs.renderFile(
      path.resolve(__dirname, "../pages/index.ejs"),
      { products: products },
      function (err, str) {
        // console.log(res.send(str));
        res.send(str);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllProductsSSR = async (req, res) => {
  try {
    const products = await Product.find();
    ejs.renderFile(
      path.resolve(__dirname, "../pages/index.ejs"),
      { products: products },
      function (err, str) {
        // console.log(res.send(str));
        res.send(str);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAddForm = async (req, res) => {
  try {
    ejs.renderFile(
      path.resolve(__dirname, "../pages/add.ejs"),
      function (err, str) {
        // console.log(res.send(str));
        res.send(str);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    let query = Product.find(); // initialize query
    const pageSize = 4;
    const page = parseInt(req.query.page) || 1; // handle page param, default to 1

    // Handle sorting if sort params are provided
    if (req.query.sort && req.query.order) {
      const sortField = req.query.sort; // e.g. price or rating
      const sortOrder = parseInt(req.query.order); // Convert order to number (1 or -1)

      // Apply sorting, pagination, and execute the query
      const products = await query
        .sort({ [sortField]: sortOrder }) // dynamic sorting based on field and order
        .skip(pageSize * (page - 1)) // apply pagination
        .limit(pageSize)
        .exec();

      res.json(products); // send sorted and paginated data
    } else if (req.query.page) {
      // Only pagination, no sorting
      const products = await query
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();

      res.json(products);
    } else {
      // Default, return all products with no pagination or sorting
      const products = await query.exec();

      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by custom 'id' field
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Replace an existing product by custom 'id' field
exports.replaceProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findOneAndReplace(
      { id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing product by custom 'id' field
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a product by custom 'id' field
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ id: id });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
