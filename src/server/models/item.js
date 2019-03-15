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
  _owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Item', itemSchema);
