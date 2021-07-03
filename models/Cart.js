const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  itemId: {type: String},
  title: {type: String},  
  image: {type: String}, 
  price: {type: Number},
  userId: {type: Types.ObjectId, ref: 'User'},
  count: {type: Number}
});

module.exports = model('Cart', schema);
