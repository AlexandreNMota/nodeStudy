const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Nome de usuário é obrigatório'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email é obrigatório'],
    lowercase: true,
    validate: [validator.isEmail, 'Formato de email incorreto'],
  },
  photo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Por favor, insira uma senha'],
    trim: true,
    minLength: [8, 'Senha deve conter pelo menos 10 caracteres'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Por favor, confirme sua senha'],
    trim: true,
    minLength: [8, 'Senha deve conter pelo menos 10 caracteres'],
    validate: {
      // THIS ONLY WORKS ON SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Senhas não conferem',
    },
  },
});

// RUN ON SAVE if PASSWORD WAS MODIFIED, HASHES IT AND EXCLUDES THE CONFIRMPASSWORD
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
