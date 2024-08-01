const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
	include: [Product]
  });
  // be sure to include its associated Products
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
	const id = req.params.id;

	const category = await Category.findByPk(id, {
		include: Product
	});
	res.json(category);
});

router.post('/', async(req, res) => {
  // create a new category
	const formData = req.body;
	const category = await Category.create(formData);

	res.json({
		message: 'Category added successfully!',
		category: category
	});

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(
	req.body,
	{
		where: {
			id: req.params.id
		},
		returning: true,
		plain: true
	}
  );
  res.json(category[1]);

});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
	await Category.destroy({
		where: {
			id: req.params.id
		}
	});

	res.json({
		message: 'Category deleted successfully'
	})
});

module.exports = router;
