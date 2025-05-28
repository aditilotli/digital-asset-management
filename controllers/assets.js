const assetModal = require('../modals/schema/asset');


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

            let assetData = await 

            
            return res.status(200).json("completed")
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
    }
}