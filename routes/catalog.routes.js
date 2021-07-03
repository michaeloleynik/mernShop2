const {Router} = require('express');
const Item = require('../models/Item');

const router = Router();

router.get(
  '/getAll',
  
  async (req, res) => {
    try {
      await Item.find({}, function (err, items) {
        if (err) {
          throw err;
        } else {
          res.json(items);
        }
      });
    } catch (e) {
      res.status(500).json({message: "Something went wrong..."});
    }
});

module.exports = router;