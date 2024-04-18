const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    select: false,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
