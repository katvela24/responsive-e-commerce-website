const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag"
  }
);

// Product.belongsTo(Tag, {
//   through: ProductTag,
//   foreignKey: "id",
//   as: "tag_id"
// }),

//   Tag.hasMany(Product, {
//     through: ProductTag,
//     foreignKey: "product_id",
//     as: "product"
//   }),


  module.exports = ProductTag;
