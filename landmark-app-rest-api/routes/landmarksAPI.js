'use strict';
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

const router = express.Router();
module.exports = router;

// =================================================================================================
// functions
// =================================================================================================
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5242880,
    },
    fileFilter: fileFilter,
});

async function photoPreProcessing(file) {
    const buffer = file.buffer.toString('base64');
    const hash = crypto
        .createHash('md5')
        .update(buffer)
        .digest('hex');
    const original = new Parse.File(hash, { base64: buffer });
    await original.save();

    const resized = await sharp(file.buffer)
        .rotate()
        .resize(250, 250, { fit: 'inside' })
        .toBuffer();
    const resized_buffer = resized.toString('base64');
    const thumbnail = new Parse.File('thumb_' + hash, { base64: resized_buffer });
    await thumbnail.save();

    return { original, thumbnail };
}

// =================================================================================================
// Routes
// =================================================================================================
/* landmarks API */
router.get('/get_landmarks/', async (req, res) => {
    try {
        const Landmark = Parse.Object.extend('Landmarks');
        const query = new Parse.Query(Landmark);
        query.select('_id', 'title', 'short_info', 'photo', 'photo_thumb');
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

router.post('/update_landmark/:landmark_id', async (req, res) => {
    try {
        const landmark_id = req.params.landmark_id;
        const Landmark = Parse.Object.extend('Landmarks');
        const query = new Parse.Query(Landmark);
        const landmark = await query.get(landmark_id);

        landmark.set('title', req.body.title);
        landmark.set('description', req.body.description);
        landmark.set('short_info', req.body.short_info);
        landmark.set('url', req.body.url);

        await landmark.save();

        return res.status(200).json(landmark);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: error.message });
    }
});

router.post('/update_image/:landmark_id', upload.single('photo'), async (req, res) => {
    try {
        const landmark_id = req.params.landmark_id;
        const Landmark = Parse.Object.extend('Landmarks');
        const query = new Parse.Query(Landmark);
        const landmark = await query.get(landmark_id);

        const photo = await photoPreProcessing(req.file);
        landmark.set('photo', photo.original);
        landmark.set('photo_thumb', photo.thumbnail);

        await landmark.save(null);

        return res.status(200).json(landmark);
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
});

// Catch only the Multer errors, by using the MulterError class
router.use((err, req, res, next) => {
    //Catch multer error
    let message;
    if (err.code === 'LIMIT_PART_COUNT') { message='Too many parts' };
    if (err.code === 'LIMIT_FILE_SIZE') { message='File too large' };
    if (err.code === 'LIMIT_FILE_COUNT') { message='Too many files' };
    if (err.code === 'LIMIT_FIELD_KEY') { message='Field name too long' };
    if (err.code === 'LIMIT_FIELD_VALUE') { message='Field value too long' };
    if (err.code === 'LIMIT_FIELD_COUNT') { message='Too many fields' };
    if (err.code === 'LIMIT_UNEXPECTED_FILE') { message='Unexpected field' };
    if (message !== undefined) {
        return res.status(500).json({ ok: false, message: message });
    }
});