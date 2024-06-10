module.exports.index = (req, res) => {
    res.render("clients/pages/products/index");
}
module.exports.create = (req, res) => {
    res.render("clients/pages/products/create");
}
module.exports.edit = (req, res) => {
    res.render("clients/pages/products/edit");
}
module.exports.detail = (req, res) => {
    res.render("clients/pages/products/detail");
}