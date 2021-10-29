const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Users listed',
    data: [],
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `User with id ${id} retrieved`,
    data: {},
  });
});

router.post('/', (req, res) => {
  const user = req.body;

  res.json({
    message: 'User created',
    data: user,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  res.json({
    message: `User with id ${id} updated`,
    data: user,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `User with id ${id} deleted`,
  });
});

module.exports = router;
