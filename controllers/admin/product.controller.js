const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");
const { model } = require("mongoose");
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
                        .skip(pagination.skip)
                        .sort({
                            position: "desc"
                        });

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
    });
    req.flash('success', 'welcome');
    res.json({
        code: 200
    });
}
// PATCH
module.exports.changeMulti = async (req, res) => {
    console.log(req.body);
    const {status, ids} = req.body;
    switch(status){
        case "active":
        case "inactive":
            await Product.updateMany({
                _id : ids
            }, {
                status: status
            });
        break;
        case "delete":
            await Product.updateMany({
                _id: ids
            }, {
                deleted: true
            })
    }
    res.json({
        code: 200
    });
}
// DELETE
module.exports.deleteItem = async(req, res) => {
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        deleted: true
    });
    res.json({
        code: 200
    });
}
// PATCH [CHANGE POSITION]
module.exports.changePosition = async(req, res) => {
    const id = req.params.id;
    const position = req.body.position;
    console.log(position);
    await Product.updateOne({
        _id: id
    }, {
        position: position
    });
    res.json({
        code: 200
    })
}