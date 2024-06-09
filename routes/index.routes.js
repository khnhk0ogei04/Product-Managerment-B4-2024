module.exports.index = (app) => {
    app.get("/", (req, res) => {
        res.render("clients/pages/home/index.pug");
    });
    app.get("/products", (req, res) => {
        res.render("clients/pages/products/index");
    })
}