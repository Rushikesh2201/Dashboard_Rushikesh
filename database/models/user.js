
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique : 'tt_unique_constraint',
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      unique : 'tt_unique_constraint',
    },
    phone_number: {
      type: DataTypes.STRING,
      required: true,
      unique : 'tt_unique_constraint',
    }
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
    // Users.hasMany(models.Post, {
    //   foreignKey: 'userId',
    //   as: 'posts',
    //   onDelete: 'CASCADE',
    // });
  };
  return Users;
};