const path = require('path');
const assetModal = require('../modals/schema/asset');
const fs = require('fs');


async function checkAssetId(id) {
    const assetObj = await assetModal.findOne({ "assetId": id });

    if(assetObj == null) {
        console.log(`Unique assetObj ==== ${assetObj}`);
        return true;
    }
    console.log(`assetObj not null ==== ${assetObj}`);
    console.log("Not unique ID");
    return false;
}

module.exports = {
    testapi: async (req, res) => {
        console.log("testing");

        try {
            return res.status(200).json("completed")
        } catch (error) {
            return res.status(500).json({ error })
        }
    },

    searchData: async (req, res) => {
        try {
            let response = {};

            console.log("req.query ===>", req.query);

            let fileNameCond = req.query.fileName ? {"fileName": { $exists: true, $regex: new RegExp(req.query.fileName, 'i')}} : {};
            let originalNameCond = req.query.originalName ? {"originalName": { $exists: true, $regex: new RegExp(req.query.originalName, 'i')}} : {};
            let mimetypeCond = req.query.mimetype ? {"mimetype": { $exists: true, $regex: new RegExp(req.query.mimetype, 'i')}} : {};
            let tagsCond = req.query.tags
                ? { tags: { $elemMatch: { $regex: new RegExp(req.query.tags, 'i') } } }
                : {};
            
            let sizeCond = {};

            if (req.query.size) {
                sizeCond.size = {};
                sizeCond.size.$gte = parseInt('0');
                if (req.query.size) sizeCond.size.$lte = parseInt(req.query.size);
            }

            let uploadDateCond = req.query.uploadDate
                ? {
                    uploadDate: {
                        $gte: new Date(new Date(req.query.uploadDate).setHours(0, 0, 0, 0)),
                        $lte: new Date(new Date(req.query.uploadDate).setHours(23, 59, 59, 999))
                    }
                    }
                : {};


            let aggregateQuery = [
                {
                    $match: {
                        $and: [fileNameCond, originalNameCond, mimetypeCond, tagsCond, sizeCond, uploadDateCond]
                    }
                },
                { $sort: { createdAt: -1 } }
            ]
            
            let assetData = await assetModal.aggregate(aggregateQuery);
            console.log(assetData);

            response = {
                assetData
            }

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    },

    uploadAsset: async (req, res) => {
        console.log("Uploading asset...");

        try {
            const file = req.file;
            console.log(file);

            console.log(req.body);
            const { tags } = req.body;

            let newUniId;
            let uniqueId;
            do {
                newUniId = `AS${Math.floor(1000000000 + Math.random() * 9000000000)}`;
                console.log(`Generated Id : ${newUniId}`);

                uniqueId = await checkAssetId(newUniId);
            } while (!uniqueId);

            const asset = new assetModal({
                assetId: newUniId,
                fileName: file.filename,
                originalName: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                tags: tags ? tags.split(',') : []
            });

            console.log("Asset created ===>", asset);

            await asset.save();

            return res.status(200).json({ message: 'File Uploaded successfully...'});

            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    downloadAsset: async (req, res) => {
        console.log('downloading....');

        try {
            console.log('downloading....');

            const filePath = path.join(__dirname, '../uploads', req.params.filename);
            console.log("Resolved file path:", filePath);

            if (fs.existsSync(filePath)) {
            return res.download(filePath, (err) => {
                if (err) {
                console.error("Download error:", err);
                res.status(500).send("Could not download file.");
                }
            });
            } else {
            return res.status(404).json({ error: 'File not found' });
            }
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}