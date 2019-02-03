const conn = require('./conn');
const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = User;
