'use strict';
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('user', {
    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    lastlogin: {
      type: Sequelize.DATE
    },

    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },

    preferredlocation: {
      type: Sequelize.STRING
    },

    preferredtopic: {
      type: Sequelize.STRING
    },

    preferredday: {
      type: Sequelize.STRING
    },

    preferredtime: {
      type: Sequelize.STRING
    }
  });

  User.associate = function(models) {
    models.user.belongsToMany(models.group, {through: 'groupusers'});
  };

  return User;
};
