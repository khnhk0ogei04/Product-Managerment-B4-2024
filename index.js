const express = require('express');
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Trang Chủ");
});

app.get("/products", (req, res) => {
    res.send("Trang Danh Sách Sản Phẩm")
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
