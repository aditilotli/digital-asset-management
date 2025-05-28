const mongoose = require('mongoose');
const Schema = mongoose.Schema

const assetSchema = new Schema({
    assetId: { type: String, index: true, unique: true },
    fileName: { type: String },
    originalName: String,
    mimetype: String,
    size: { type: Number },
    tags: [String],
    uploadDate: { type: Date, default: Date.now}
}, {timestamps: true});

let asset = mongoose.model('asset', assetSchema);

module.exports = asset;