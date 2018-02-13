const bcrypt = require('bcrypt');
const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const ROLES = ['regular', 'admin', 'manager'];
const DEPARTMENTS = ['general', 'JS', 'management', 'Node'];

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  firstName: {
    type: String,
    unique: false,
    default: '',
  },
  lastName: {
    type: String,
    unique: false,
    default: '',
  },
  role: {
    type: String,
    enum: ROLES,
    default: 'regular',
    required: true,
  },
  department: {
    type: String,
    enum: DEPARTMENTS,
    default: 'general',
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

exports.User = mongoose.model('User', userSchema);
