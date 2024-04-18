const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please, provide your e-mail!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid e-mail.'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please insert a password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'The passwords must be equal!',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
