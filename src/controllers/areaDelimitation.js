const { getAreaDelimitation, getDetailDelimitation, setAreaDelimitation, setDetailDelimitation } = require('../databases/areaDelimitation');
const { getCoordinates, setCoordinate } = require('../databases/coordinates');
const { getUser } = require('../databases/users');
const { formatDate, formatDateYMD } = require('./common');

const areaDelimitationController = {
    getAreaDelimitation: async (context) => {
        let result;
        try {
            let areaDelimitation = await getAreaDelimitation(context);
            let coor = await getCoordinates(context);
            result = await Promise.all(
                areaDelimitation.map(async area => {
                    let user = await getUser(context, area.user_id);
                    return {
                        id: `${area.id}`,
                        userInfo: {
                            name: `${user.name}`,
                            email: `${user.email}`,
                        },
                        provider: area.provider,
                        name: area.name,
                        note: area.note,
                        status: `${area.status}`,
                        genotype: `${area.genotype}`,
                        create_at: `${formatDate(new Date(area.created_at))}`,
                        dateOfPlanting: `${formatDateYMD(new Date(area.dateOfPlanting == null ? area.created_at : area.dateOfPlanting ))}`,
                        detail: (await getDetailDelimitation(context, area.id))
                            .map(detailDelimitation => {
                                let locate = coor.filter(c => c.id == detailDelimitation.coordinates_id)[0];
                                return {
                                    sort: `${detailDelimitation.sort}`,
                                    coordinate: {
                                        id: `${locate.id}`,
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
    setAreaDelimitation: async (context, user_id, name, provider, note, status, genotype, coordinateDetails, created_at, dateOfPlanting) => {
        try {
            let rand = `${Date.now().toString().substr(7, 6)}${Math.floor(Math.random() * (99 - 10) + 10)}`;
            let areaDelimitation_id = `a${rand}`;

            await setAreaDelimitation(context, areaDelimitation_id, user_id, name, provider, note, status, genotype, created_at, dateOfPlanting);

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