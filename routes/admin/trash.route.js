const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/trash.controller");

router.get("/", controller.index);
router.patch("/restore/:id", controller.restore);
module.exports = router;