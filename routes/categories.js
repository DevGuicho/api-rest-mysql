const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Categories listed',
    data: [],
  });
});

module.exports = router;
