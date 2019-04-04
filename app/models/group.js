'use strict';
module.exports = function(sequelize, Sequelize) {
  var Group = sequelize.define('group', {
    groupname: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    },

    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },

    grouplocation: {
      type: Sequelize.STRING
    },

    grouptopic: {
      type: Sequelize.STRING
    }
  });

  Group.associate = function(models) {
    models.group.belongsToMany(models.user, { through: 'groupusers' });
  };

  return Group;
};
