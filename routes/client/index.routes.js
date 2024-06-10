const homeRouter = require("./home.route");
const productRouter = require("./product.route");
module.exports.index = (app) => {
    app.get("/", homeRouter);
    app.get("/products", productRouter);
}