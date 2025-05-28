const express = require('express');
const router = express.Router();
const assetCtrl = require('../controllers/assets');
const multerUpload = require('../controllers/multerConfig');

router.get('/testapi', assetCtrl.testapi);

router.get('/search', assetCtrl.searchData);

router.post('/upload', multerUpload.single('file'), (req, res) => {
// router.post('/upload', (req, res) => {
    try {
        if(!req.file) {
            console.error('Invalid File');
            res.status(400).send({ message: 'Invalid File' });
            return;
        }
        console.log("Upload process will start...");
        assetCtrl.uploadAsset(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to upload the file' });
    }
});

module.exports = router;