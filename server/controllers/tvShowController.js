const TVShow = require('../models/TVShow');


exports.getAllTVShows = async (req, res) => {
    try {
        const tvShows = await TVShow.find().sort({ createdAt: -1 });
        res.json(tvShows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTVShow = async (req, res) => {
    try {
        const tvShow = await TVShow.findById(req.params.id);
        if (!tvShow) {
            return res.status(404).json({ message: 'TV Show not found' });
        }
        res.json(tvShow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createTVShow = async (req, res) => {
    const tvShow = new TVShow({
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating
    });

    try {
        const newTVShow = await tvShow.save();
        res.status(201).json(newTVShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateTVShow = async (req, res) => {
    try {
        const tvShow = await TVShow.findById(req.params.id);
        if (!tvShow) {
            return res.status(404).json({ message: 'TV Show not found' });
        }

        if (req.body.title) tvShow.title = req.body.title;
        if (req.body.genre) tvShow.genre = req.body.genre;
        if (req.body.rating) tvShow.rating = req.body.rating;

        const updatedTVShow = await tvShow.save();
        res.json(updatedTVShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteTVShow = async (req, res) => {
    try {
        const tvShow = await TVShow.findById(req.params.id);
        if (!tvShow) {
            return res.status(404).json({ message: 'TV Show not found' });
        }

        await tvShow.deleteOne();
        res.json({ message: 'TV Show deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 