const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  firstName: {type: String, required: true},
  secondName: {type: String, required: true},
  adress: {type: String, required: true},
  phone: {type: String, required: true},
  order: [{
    title: {type: String},  
    image: {type: String}, 
    price: {type: Number},
    count: {type: Number}
  }],
  userId: {type: Types.ObjectId, ref: 'User'},
  isFinished: {type: Boolean, required: true}
  
});

module.exports = model('Order', schema);