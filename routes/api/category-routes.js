const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: Product
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  const category_id = parseInt(req.params.id)
  try {
    const categoryData = await Category.findOne({
      where: { id: category_id },
      include: Product
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,

  })
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.status(200).json(newCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// update product data
router.put('/:id', (req, res) => {
  const category_id = parseInt(req.params.id)
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: { id: category_id },
    }
  )
    .then((updatedCategory) => {
      // Send the newly created row as a JSON object
      res.status(200).json(updatedCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
})

// Delete route 
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
