const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: Boolean},
  secretWord: {type: String},
  products: [{ type: Types.ObjectId, ref: 'Cart' }],
  orders: [{type: Types.ObjectId, ref: 'Order'}]
});

module.exports = model('User', schema);
