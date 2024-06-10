const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
});
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;