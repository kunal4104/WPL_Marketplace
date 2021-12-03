const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);
router.use(authController.protected);

router
  .route('/')
  .get(authController.restrictTo('admin'), orderController.getAllOrders)
  .post(authController.restrictTo('user'), orderController.createOrder);

router
  .route('/:id')
  .get(authController.restrictTo('admin'), orderController.getOrder)
  .patch(authController.restrictTo('admin'), orderController.updateOrder);

router.get('/user/:id', orderController.getUserOrders);

// router.post(
//   '/',
//   authController.restrictTo('user'),
//   orderController.createOrder
// );
// router.patch(
//   '/:id',
//   productController.uploadProductPhoto,
//   productController.resizeProductPhoto,
//   productController.updateProduct
// );
// router.delete('/:id', productController.deleteProduct);

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
