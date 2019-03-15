const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  type: [{ type: String }],
  icon: String,
  path: String,
  permanent: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    required: false,
    default: ''
  },
  rowPos: {
    type: String,
    required: false,
    default: 'auto'
  },
  colPos: {
    type: String,
    required: false,
    default: 'auto'
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Item', itemSchema);
