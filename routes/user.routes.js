const {Router} = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require('express-validator');
const router = Router();

router.post(
  '/addToCart',
  auth,

  async (req, res) => {
    try {
      const {itemId, title, image, price} = req.body;
      const {userId} = req.user;

      const currentProduct = await Cart.find({userId, itemId});

      if (!currentProduct.length) {
        const item = await new Cart({itemId, title, image, price, userId, count: 1});

        item.save();

        return res.status(201).json({message: "The item has been added to cart successfully!"});
      }

      const id = currentProduct[0]['_id'];

      let count = currentProduct[0]['count'];

      const newCount = ++count;

      await Cart.updateOne({_id: id}, {count: newCount}, function(err) {
        if (err) {
          throw err;
        }

        return res.status(201).json({message: "The item has been added to cart successfully!"});
      });

    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
      throw e;
    }
  }
)

router.post(
  '/updateCartItems',

  async (req, res) => {
    try {
      const {id, title, description, image, price} = req.body;

      await Cart.updateMany({itemId: id}, {
        title,
        description,
        image,
        price
      }, function(err, data) {
        if (err) {
          throw err;
        }

        return res.status(201).json({message: "Updated!"});
      });
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
      throw e;
    }
  }
)

router.post(
  '/removeCartItems',

  async (req, res) => {
    try {
      const {id} = req.body;

      await Cart.deleteMany({itemId: id}, function (err) {
        if (err) {
          throw err;
        }
        
        res.status(201).json({message: "Deleted!"});
      });
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
  }
)

router.post(
  '/updateCount',
  auth,

  async (req, res) => {
    try {
      const {itemId, currentCount} = req.body;
      const {userId} = req.user;

      if (currentCount <= 0) {
        await Cart.deleteOne({userId, itemId});
        return res.status(201).json({message: "Deleted!"});
      }

      await Cart.updateOne({userId, itemId}, {
        count: currentCount
      }, function(err, data) {
          if (err) {
            throw err;
          }

        return res.status(201).json({message: "Updated!"});
      });

    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
      throw e;
    }
  }
)

router.post(
  '/finishOrder',
  [
    check('firstName', 'Wrong First Name!').isLength({min: 1}),
    check('secondName', 'Wrong Second Name!').isLength({min: 1}),
    check('adress', 'Wrong Adress!').isLength({min: 1}),
    check('phone', 'Wrong Phone!').isMobilePhone()
  ],
  auth,

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({message: "All fields must to be correct!"});
      }
      const {userId} = req.user;
      const {firstName, secondName, adress, phone, isFinished, totalItems} = req.body;
      
      const order = await new Order({firstName, secondName, adress, phone, order: totalItems, userId, isFinished});

      order.save();
      
      await Cart.deleteMany({userId});

      res.status(201).json({message: "The order has been created successfully!"});
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
  }
)

router.get(
  '/getAllFromCart',
  auth,

  async (req, res) => {
    try {
      const {userId} = req.user;

      const cartItems = await Cart.find({userId});
        
      res.json(cartItems);

    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
      throw e;
    }
  }
)

module.exports = router;
