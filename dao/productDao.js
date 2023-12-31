const mongoose = require("mongoose");
const Product = require("../models/Product");

class ProductDAO {
  // Agregar un nuevo producto
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los productos con filtros, paginación y ordenamientos
  async getAllProducts(query, limit = 10, page = 1, sort = "asc") {
    try {
      const skip = (page - 1) * limit;
      const products = await Product.find(query)
        .limit(limit)
        .skip(skip)
        .sort({ price: sort });
      return products;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un producto por su ID
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un producto por su ID
  async updateProduct(productId, productData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, productData, {
        new: true,
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un producto por su ID
  async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndRemove(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductDAO();
