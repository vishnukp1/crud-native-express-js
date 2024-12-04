const stock = require("../model/stockSchema");
const stockSchema = require("../model/stockSchema");
const validate = require("../validation/validate");

const createStock = async (req, res) => {
  const { error, value } = validate.stockValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, price, category } = value;

  const stock = new stockSchema({
    name: name,
    price: price,
    category: category,
  });

  await stock.save();

  console.log(stock);

  res.status(200).json({
    message: "Successfully stock added",
    status: "success",
    data: stock,
  });
};

const getAllStock = async (req, res) => {
  const stocks = await stockSchema.find();
  res.status(200).json({
    message: "Successfully all stock got",
    status: "success",
    data: stocks,
  });
};
const getStock = async (req, res) => {
  const stock = await stockSchema.findById(req.params.id);
  res.status(200).json({
    message: "Successfully all stock got",
    status: "success",
    data: stock,
  });
};

const deleteStock = async (req, res) => {
  const deleteData = await stockSchema.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Successfully deleted stock data",
    status: "success",
    data: deleteData,
  });
};

const updateStock = async (req, res) => {
  const updatedStock = await stockSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: "Successfully updated stock data",
    status: "success",
    data: updatedStock,
  });
};

const searchStock = async (req, res) => {
  const name = req.query.name;

  const regex = new RegExp(name, "i");

  const users = await stockSchema.find({ name: { $regex: regex } });

  res.json(users);
};

module.exports = {
  createStock,
  getAllStock,
  getStock,
  deleteStock,
  updateStock,
  searchStock,
};
