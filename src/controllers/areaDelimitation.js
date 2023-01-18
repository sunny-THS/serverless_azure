const { getAreaDelimitation, getDetailDelimitation, setAreaDelimitation, setDetailDelimitation } = require('../databases/areaDelimitation');
const { getCoordinates, setCoordinate } = require('../databases/coordinates');

const areaDelimitationController = {
    getAreaDelimitation: async (context) => {
        let result;
        try {
            let areaDelimitation = await getAreaDelimitation(context);
            let coor = await getCoordinates(context);

            result = await Promise.all(
                areaDelimitation.map(async area => {
                    return {
                        id: `${area.id}`,
                        user_id: `${area.user_id}`,
                        status: `${area.status}`,
                        detail: (await getDetailDelimitation(context, area.id))
                            .map(detailDelimitation => {
                                let locate = coor.filter(c => c.id == detailDelimitation.coordinates_id)[0];
                                return {
                                    sort: `${detailDelimitation.sort}`,
                                    coordinate: {
                                        latitude: `${locate.latitude}`, 
                                        longitude: `${locate.longitude}`
                                    },
                                }
                            })
                    };
                })
            );
        } catch (error) {
            context.log('err getAreaDelimitation', error)
            throw new Error(error);
        }
        return result;
    },
    setAreaDelimitation: async (context, user_id, status, coordinateDetails) => {
        try {
            let rand = `${Date.now().toString().substr(7, 6)}${Math.floor(Math.random() * (99 - 10) + 10)}`;
            let areaDelimitation_id = `a${rand}`;

            await setAreaDelimitation(context, areaDelimitation_id, user_id, status);

            let details = [];

            for (let index = 0; index < coordinateDetails.length; index++) {
                const coor = coordinateDetails[index];
                let rand = `${Date.now().toString().substr(7, 6)}${Math.floor(Math.random() * (99 - 10) + 10)}`;
                let coordinates_id = `c${rand}`;
    
                await setCoordinate(context, coordinates_id, coor.latitude, coor.longitude)

                details.push({
                    coordinates_id: coordinates_id,
                    sort: index
                });
            }
            context.log('0----------------- details: ', details)

            await setDetailDelimitation(context, areaDelimitation_id, details)

        } catch (error) {
            context.log('err getAreaDelimitation', error)
            throw new Error(error);
        }
    },
};

module.exports = areaDelimitationController;