const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.single('photo');

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${Date.now()}.jpeg`;
  req.body.photo = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`./../furniture_store/public/img/product/${req.file.filename}`);

  // .toFile(`public/img/products/${req.file.filename}`);

  next();
});

exports.createProduct = factory.createOne(Product);
exports.getProduct = factory.getOne(Product);
exports.getAllProducts = factory.getAll(Product);

// Do NOT update passwords with this!
exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);
