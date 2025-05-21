const express = require('express');
const router = express.Router();
const tvShowController = require('../controllers/tvShowController');


router.get('/', tvShowController.getAllTVShows);
router.get('/:id', tvShowController.getTVShow);
router.post('/', tvShowController.createTVShow);
router.put('/:id', tvShowController.updateTVShow);
router.delete('/:id', tvShowController.deleteTVShow);

module.exports = router; 