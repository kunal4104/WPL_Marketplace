const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });
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
    .toFile(`public/img/products/${req.file.filename}`);

  next();
});

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

// exports.getMe = (req, res, next) => {
//   req.params.id = req.product.id;
//   next();
// };

// exports.updateMe = catchAsync(async (req, res, next) => {
//   // 1) Create error if user POSTs password data
//   //   if (req.body.password || req.body.passwordConfirm) {
//   //     return next(
//   //       new AppError(
//   //         'This route is not for password updates. Please use /updateMyPassword.',
//   //         400
//   //       )
//   //     );
//   //   }

//   // 2) Filtered out unwanted fields names that are not allowed to be updated
//   const filteredBody = filterObj(req.body, 'name', 'email');
//   if (req.file) filteredBody.photo = req.file.filename;

//   // 3) Update user document
//   const updateProduct = await Product.findByIdAndUpdate(
//     req.product.id,
//     filteredBody,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updateProduct,
//     },
//   });
// });

//
// exports.deleteMe = catchAsync(async (req, res, next) => {
//   await Product.findByIdAndUpdate(req.product.id, { active: false });

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// exports.createProduct = (req, res) => {
//   const newProduct = await Product.create({
//     name: req.body.title,
//     // email: req.body.email,
//     // password: req.body.password,
//     // passwordConfirm: req.body.passwordConfirm,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: newProduct,
//   });
// };

exports.createProduct = factory.createOne(Product);
exports.getProduct = factory.getOne(Product);
exports.getAllProducts = factory.getAll(Product);
exports.getAllBedroomProducts = factory.getAllBedroomProducts(Product)
exports.getAllKitchenProducts = factory.getAllKitchenProducts(Product)
exports.getAllStudyProducts = factory.getAllStudyProducts(Product)
exports.getAllDiningProducts = factory.getAllDiningProducts(Product)
exports.getSpecificProduct = factory.getSpecificProduct(Product)

exports.getSearchedBedroomProducts = factory.getSearchedBedroomProducts
exports.getSearchedKitchenProducts = factory.getSearchedKitchenProducts
exports.getSearchedStudyProducts = factory.getSearchedStudyProducts
exports.getSearchedLivingProducts = factory.getSearchedLivingProducts

// Do NOT update passwords with this!
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
