const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
    default: 'not set'
  },
  preferences: {
    wallpaper: {
      type: String,
      default: 'wallpaper_default.jpg',
      required: false
    }
  }
});

userSchema.plugin(uniqueValidator, {
  message: 'User with this {PATH} exists.'
});
module.exports = mongoose.model('User', userSchema);
