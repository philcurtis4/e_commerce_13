const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { beforeFindAfterExpandIncludeAll } = require('../../models/Category');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
	include: Product
});
  // be sure to include its associated Product data

  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id
  const tag = await Tag.findByPk(id, {
	include: Product
  });

  res.json(tag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const formData = req.body;

  const tag = await Tag.create(formData);

  res.json({
	message: 'Tag created successfully',
	tag: tag
  })

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(
	req.body,
	{
		where: {
			id: req.params.id
		},
		returning: true,
		plain: true
	}
  );
  res.json(tag[1])
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
	where: {
		id: req.params.id
	}
  });

  res.json({
	message: 'Tag deleted successfully'
  });
});

module.exports = router;
