const {Router} = require('express');
// const {check, validationResult} = require('express-validator');
const Item = require('../models/Item');
const Order = require('../models/Order');

const router = Router();

// /api/auth/register

router.post(
  '/add',
  
  async (req, res) => {
    try {

      const {title, description, image, price} = req.body;

      const candidate = await Item.findOne({ title });

      if (candidate) {
        return res.status(400).json({message: "An item with the same name is already exists!"});
      }
      
      const item = new Item({title, description, image, price});

      await item.save();

      res.status(201).json({message: "The item has been created successfully!"})

    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
  }
);

router.post(
  '/updateItem',

  async (req, res) => {
    try {
      const {id, title, description, image, price} = req.body;

      await Item.findByIdAndUpdate(id, {title, description, image, price}, function (err) {
        if (err) {
          throw err;
        }
        
        res.status(201).json({message: "Updated!"});
      });
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
  }
)

router.post(
  '/removeItem',

  async (req, res) => {
    try {
      const {id} = req.body;

      // console.log(req.body);

      await Item.findByIdAndDelete(id, function (err) {
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
  '/finishOrder',

  async (req, res) => {
    try {
      const {id, isFinished} = req.body;
      console.log(id);

      // console.log(req.body);

      await Order.findByIdAndUpdate(id, {isFinished}, function (err) {
        if (err) {
          throw err;
        }
        
        res.status(201).json({message: "Finished!"});
      });
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
  }
)

router.get(
  '/getAllOrders',
  
  async (req, res) => {
    try {
      await Order.find({isFinished: false}, function (err, orders) {
        if (err) {
          throw err;
        } else {
          console.log(orders);
          res.json(orders);
        }
      });
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
});

module.exports = router;