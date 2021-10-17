const Sequelize = require('sequelize')
const DB = require('../../lib/Db.js')
const sequelize = DB.getSequelize()

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUnique: (value, next) => {
        User.findAll({
          where: { username: value },
          attributes: ['id'],
        })
          .then((user) => {
            if (user.length != 0)
              next(new Error('Username address already in use!'));
            next();
          })
          .catch((onError) => console.log(onError));
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uploadedImageAmount: {
    type: Sequelize.NUMBER,
    defaultValue: 0,
    allowNull: false
  },      
})


module.exports = User