const Product = require("../model/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("node:crypto");
const { log } = require("console");

const AccessKey = process.env.ACCESS_KEY;
const SecretAccessKey = process.env.SECRET_ACCESS_KEY;
const BucketName = process.env.BUCKET_NAME;
const BucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
  region: BucketRegion,
  credentials: {
    accessKeyId: AccessKey,
    secretAccessKey: SecretAccessKey,
  },
});

const createProduct = async (req, res) => {
  req.body.image = req.file.originalname;
  const params = {
    Bucket: BucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const product = await new Product(req.body);
  product.save();
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  let product = [];
  for (let i = 0; i < products.length; i++) {
    let midproduct = products[i];
    const getObjectParams = {
      Bucket: BucketName,
      Key: midproduct.image,
    };
    const getcommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getcommand, { expiresIn: 3600 });
    const imageUrl = url;
    midproduct.image = imageUrl;
    product[i] = midproduct;
  }
  res.status(StatusCodes.OK).json({ product, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById({ _id: productId });
  console.log(product);
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  const getObjectParams = {
    Bucket: BucketName,
    Key: product.image,
  };
  const getcommand = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, getcommand, { expiresIn: 3600 });
  const imageUrl = url;
  product.image = imageUrl;

  res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
  const  id  = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
