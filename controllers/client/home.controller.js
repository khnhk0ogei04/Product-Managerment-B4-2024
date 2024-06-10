module.exports.index = (req, res) => {
    res.render("clients/pages/home/index", {
        pageTitle: "Trang Chủ"
    });
};