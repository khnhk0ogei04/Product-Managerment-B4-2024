const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    const filterStatus = [
        {
            label: "Tất cả",
            status: ""
        },
        {
            label: "Hoạt động",
            status: "active"
        },
        {
            label: "Dừng Hoạt động",
            status: "inactive"
        }
    ];
    if (req.query.status){
        find.status = req.query.status;
    }
    // Tim Kiem //
    let keyword = "";
    if (req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i"); // "i": Khong phan biet chu hoa chu thuong
        find.title = regex;
        // keyword = req.query.keyword;
    }
    // Het Tim Kiem //
    const pagination = {
        currentPage: 4,
        limitItems: 4
    };
    if (req.query.page){
        pagination.currentPage = parseInt(req.query.page);
    }
    pagination.skip = (pagination.currentPage - 1)* pagination.limitItems;
    const products = await Product.find(find)
                .find(find)
                .limit(pagination.limitItems)
                .skip(pagination.skip);
        // console.log(products);
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/pagination.limitItems);
    console.log(totalPage);
    pagination.totalPage = totalPage;
  res.render("admin/pages/products/index", {
    pageTitle: "Quản lý sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: pagination
  });
}