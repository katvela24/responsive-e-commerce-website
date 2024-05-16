const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: Product, ProductTag
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  const tag_id = parseInt(req.params.id)
   try {
    const tagData = await Tag.findOne({
      where: {id: tag_id}, include: [{
        model: Product
      },{
        model: ProductTag

      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
    
  })
    .then((newTag) => {
      // Send the newly created row as a JSON object
      res.status(200).json(newTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const tag_id = parseInt(req.params.id)
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: { id: tag_id },
    }
  )
    .then((updatedTag) => {
      // Send the newly created row as a JSON object
      res.status(200).json(updatedTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
})

// Delete tag by id
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});
module.exports = router;
