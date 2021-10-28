const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    //   {
    //   include: [{ product_name: Product }, { price: Product }, { stock: Product }],
    //   attributes: {
    //     include: [
    //       [
    //         // Use plain SQL to select all from the category
    //         sequelize.literal(
    //           '(SELECT * FROM category WHERE id = product.category_id)'
    //         ),
    //         'allCategory',
    //       ],
    //     ],
    //   },
    // });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ product_name: Product }, { price: Product }, { stock: Product }],
    }); 
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new category
    try {
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,

    },
    {
      // Gets the category based on the id given in the request parameters
      where: {
        category_name: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // Sends the updated category as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});
  

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
