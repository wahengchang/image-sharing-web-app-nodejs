const Sequelize = require('sequelize')
const DB = require('../../lib/Db.js')
const sequelize = DB.getSequelize()
const User = require('../users/model')

const Image = sequelize.define('Image', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrlId: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

User.hasMany(Image, {as: 'Image', foreignKey: 'userId'})
// Image.belongsTo(Product)
// Image.belongsTo(User)

// Product.hasMany(Image, { as: "Image" });
// Image.belongsTo(Product, {
//   foreignKey: "productId",
//   as: "product",
// });

// User.hasMany(Image, { as: "Image" });
// Image.belongsTo(User, {
//   foreignKey: "userId",
//   as: "user",
// }); 

module.exports = Image