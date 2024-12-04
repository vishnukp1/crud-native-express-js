const express = require("express");
const router = express.Router();
const stock = require("../controller/stockController");
const tryCatch = require("../middleware/tryCatch");

router
  .post("/stock", stock.createStock)
  .get("/stock", stock.getAllStock)
  .get("/stock/:id", stock.getStock)
  .delete("/stock/:id", stock.deleteStock)
  .put("/stock/:id", stock.updateStock)
  .get("/searchstock", tryCatch(stock.searchStock));

module.exports = router;
