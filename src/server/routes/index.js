const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    test: true
  });
});

module.exports = router;