const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");
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
    const pagination = await paginationHelper(req);
    const products = await Product.find(find)
                        .limit(pagination.limitItems)
                        .skip(pagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Quản lý sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: pagination
  });
}
module.exports.changeStatus = async(req, res) => {
    // console.log(req.params.id);
    // const id = req.params.id;
    // const statusChange = req.params.statusChange;
    const {id, statusChange} = req.params;
    await Product.updateOne({
        _id: id,
    },{
        status: statusChange
    })
    res.redirect('back');
}