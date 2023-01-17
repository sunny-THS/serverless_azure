const { setSelfLocate, getSelfLocates, getLocates } = require('../databases/locates');
const { setCoordinate } = require('../databases/coordinates');
const { uploadIMG } = require('../controllers/uploadImgae')

const lacateController = {
    getLocates: async (context) => {
        let locates;
        try {
            locates = await getLocates(context);
        } catch (error) {
            context.log('err getLocates', error)
            throw new Error(error);
        }
        return locates;
    },
    getSelfLocates: async (context, user_id) => {
        let locates;
        try {
            locates = await getSelfLocates(user_id);
        } catch (error) {
            context.log('err getLocates', error)
            throw new Error(error);
        }
        return locates;
    },
    setSelfLocate: async (context, user_id, locate, latitude, longitude) => {
        try {
            let imageFile = await uploadIMG(context, user_id, locate.image);
            locate.setImage(imageFile);

            let rand = `${Date.now().toString().substr(7, 6)}${Math.floor(Math.random() * (99 - 10) + 10)}`;
            let coordinates_id = `c${rand}`;

            await setCoordinate(context, coordinates_id, latitude, longitude)

            locate.setCoordinatesId(coordinates_id);

            await setSelfLocate(context, user_id, locate)
        } catch (error) {
            context.log('error setSelfLocate', error);
            throw new Error(error);
        }
    }
};

module.exports = lacateController;