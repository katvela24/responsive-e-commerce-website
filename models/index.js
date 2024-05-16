// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Associations

Product.belongsTo(Category, {
   foreignKey: "category_id",
  // as: "category"
}),

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "cascade"
  // as: "category"
  // foreignKey: "product_id",
  // as: "product"
}),

Product.belongsToMany(Tag, {
  through: 'product_tag',
  // foreignKey: "id",
  // as: "tag_id"
}),


  Tag.belongsToMany(Product, {
    through: "product_tag",
    // foreignKey: "product_id",
    // as: "product"
  }),


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag

};
