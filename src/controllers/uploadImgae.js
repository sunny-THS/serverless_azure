const { BlobServiceClient } = require("@azure/storage-blob");
const uuid = require('uuid')
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
    
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECT_STORAGE);
const containerClient = blobServiceClient.getContainerClient("image");

const uploadImage = {
    uploadIMG: async (contex, user_id, image) => {
        try {
            let image64 = image.replace(/^data:image\/\w+;base64,/, "");
            
            let buf = Buffer.from(image64, 'base64');

            const rand = `${uuid.v1()}`;

            contex.log('======= image name: ', `${user_id}-${rand}.jpg`);
            
            const blobclient = containerClient.getBlockBlobClient(`${user_id}-${rand}.jpg`);
    
            const blobOptions = { blobHTTPHeaders: { blobContentType: 'image/jpg' } };
            
            await blobclient.uploadData(buf, blobOptions)
            
            return `${user_id}-${rand}.jpg`
        } catch (error) {
            throw new Error(error);
        }
        return false;
    }
}

module.exports = uploadImage;