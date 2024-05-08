const express = require("express");
const Product = require("../models/Product");
const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    return res.status(200).send({ product });
  } catch (error) {
    console.log(error);
  }
});

productRouter.get("/", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const order = req.query.order ? req.query.order : "desc";

  try {
    const products = await Product.find({})
      .sort([[sortBy, order]])
      // .sort({_id:-1})
      .skip(skip)
      .limit(limit);
    const productsTotal = await Product.countDocuments();
    const hasMore = skip + limit < productsTotal ? true : false; // skip+limit 값이 productsTotal보다 커지면 버튼이 안 보이게 됨

    return res.status(200).send({ products, hasMore });
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;

// skip = 0
// limit = 4
// skip = skip(0) + limit(4) = 4
// skip = skip(4) + limit(4) = 8
