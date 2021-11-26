const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);
router.get('/', productController.getAllProducts);
router.get('/bedroom', productController.getAllBedroomProducts);
router.get('/kitchen', productController.getAllKitchenProducts);
router.get('/dining', productController.getAllDiningProducts);
router.get('/study', productController.getAllStudyProducts);

router.get('/search' ,productController.getSpecificProduct)
router.get('/bedroom/search', productController.getSearchedBedroomProducts);
router.get('/kitchen/search', productController.getSearchedKitchenProducts);
router.get('/dining/search', productController.getSearchedDiningProducts);
router.get('/study/search', productController.getSearchedStudyProducts);


router.get('/:id', productController.getProduct);

router.use(authController.protected);

router.post(
  '/',
  productController.uploadProductPhoto,
  productController.resizeProductPhoto,
  productController.createProduct
);

router.post(
  '/categories',
  productController.uploadProductPhoto,
  productController.resizeProductPhoto,
  productController.createProduct
);



router.patch(
  '/:id',
  productController.uploadProductPhoto,
  productController.resizeProductPhoto,
  productController.updateProduct
);
router.delete('/:id', productController.deleteProduct);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// // Protect all routes after this middleware
// router.use(authController.protected);

// router.patch('/updateMyPassword', authController.updatePassword);
// router.get('/me', userController.getMe, userController.getUser);
// router.patch(
//   '/updateMe',
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
