'use strict';
const express = require('express');
const router = express.Router();
module.exports = router;

/* landmarks API */
router.get('/get_landmarks/', async (req, res) => {
    try {
        const Landmark = Parse.Object.extend('Landmarks');
        const query = new Parse.Query(Landmark);
        query.select('_id', 'title', 'short_info', 'url');
        query.ascending('order');
        const landmarksList = await query.find();
        return res.status(200).json(landmarksList);
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
});

router.get('/get_landmark_by_id/:landmark_id', async (req, res) => {
    try {
        const landmark_id = req.params.landmark_id;
        const Landmark = Parse.Object.extend('Landmarks');
        const query = new Parse.Query(Landmark);
        const landmark = await query.get(landmark_id);
        return res.status(200).json(landmark);
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
});
