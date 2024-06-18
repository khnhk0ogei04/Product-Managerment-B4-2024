const Product = require("../../models/product.model");
const { model } = require('mongoose');

module.exports.index = async (req, res) => {
    const find = {
        deleted: true
    }
    const products = await Product.find(find)

    res.render("admin/pages/trash/index", {
        pageTitle: "Thùng rác",
        products: products
    });
}
module.exports.restore = async(req, res) => {
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        deleted: false
    });
    res.json({
        code: 200
    });
}
