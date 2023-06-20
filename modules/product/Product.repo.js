const Product = require('./Product.Model');
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const path = require("path");
const { S3Client, Type } = require("@aws-sdk/client-s3");
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

exports.create = async (filter) => {
  try{
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
  return{
    success: true,
    code: 200,
    data: product,
    
  }
}catch(err){
  console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }
}
};

exports.getAll = async (filter) => {
  try{
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
  return{
    success: true,
    code: 200,
    data: product,
    
  }
}catch(err){
  console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }
} 
};
exports.getSingleProduct = async (id) => {
  try{
  const product = await Product.findById({ _id: id });
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
  return{
    success: true,
    code: 200,
    data: product,
    
  }
}catch(err){
  console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }
}
};

exports.update = async (id, data) => {
 try{ 

  const product = await Product.findOneAndUpdate({ _id: id }, data.product, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return{
      success: false,
      code: 500,
      error: `No product with id : ${productId}`
    }
  }
  else{return{
    success: true,
    code: 200,
    data: product,
    
  }}
 }catch(err){
  console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }
}
};

exports.deleteProduct = async (id) => {
  try{
  const product = await Product.findOne({ _id: id });
  if (!product) {
    return{
      success: false,
      code: 500,
      error: `No product with id : ${productId}`
    }
  }
  await product.remove();

  return{
    success: true,
    code: 200,
    message: "Product removed "
  }
}catch(err){
  console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }
}
};

exports.countAll = async (filter) => {
  try{
    let count = await Product.countDocuments()
    console.log(count);
    return{
      success: true,
      count: count,
      code: 200 
    }
  }catch(err){
    console.log("Error", err.message);
      return{
        success: false,
        code: 500,
        error: "Unexpected Error"
      }
  }
}