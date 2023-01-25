if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const { getLocates, setSelfLocate } = require("../controllers/locate");
const { getAreaDelimitation, setAreaDelimitation } = require("../controllers/areaDelimitation");
const { getGenotypes } = require('../databases/genotypes');
const { getProvider, createNewProvider, checkProviderExists } = require('../databases/provider');
const { deleteAreaDelimitation, deleteDetailDelimitation, getDetailDelimitation } = require('../databases/areaDelimitation');
const { deleteCoordinate } = require('../databases/coordinates');
const { deleteLocates, getLocate } = require('../databases/locates');

const handle = {
    register: async (context, req) => {
        context.log('======= register =======');
        const {
            email, name, password // password: md5
        } = req.body;
        
        try {
            await register(context, email, name, password);
            context.log('register success ----');

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    message: 'OK'
                }
            };
        } catch (error) {
            context.log('-------------- error register: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error.message
                }
            }
        }
    },
    login: async (context, req) => {
        context.log('======= login =======');
        const {
            email, password
        } = req.body;
        let resultLogin;
        try {
            resultLogin = await login(context, email, password);
            context.log('login ----', resultLogin);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    userInfo: resultLogin,
                }
            };
        } catch (error) {
            context.log('-------------- error login: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    getLocates: async (context, _) => {
        context.log('======= getLocates =======');
        
        let locates;
        try {
            locates = await getLocates(context);
            context.log('getLocates ----', locates);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    locates: locates.map(locate => {
                        return {
                            id: `${locate.id}`,
                            status: `${locate.status}`,
                            title: `${locate.title}`,
                            content: `${locate.content}`,
                            image: `${process.env.ENDPOINT_STORAGE}${locate.image}`,
                            coordinate: {
                                latitude: `${locate.latitude}`, 
                                longitude: `${locate.longitude}`
                            },
                            userInfo: {
                                email: `${locate.email}`,
                                name: `${locate.name}`
                            }
                        };
                    }),
                }
            };
        } catch (error) {
            context.log('-------------- error getLocates: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    setSelfLocate: async (context, req) => {
        context.log('======= setSelfLocate =======');
        const {
            user_id, locate, latitude, longitude
        } = req.body;

        let _locate = new Locate(locate.status, locate.title, locate.content, locate.image);
        try {
            await setSelfLocate(context, user_id, _locate, latitude, longitude);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    message: "OK"
                }
            };
        } catch (error) {
            context.log('-------------- error setSelfLocate: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    deleteSelfLocate: async (context, req) => {
        context.log('======= deleteSelfLocate =======');
        const {
            id
        } = req.body;

        try {
            let locate = await getLocate(context, id);

            // todo: delete data area
            await deleteLocates(context, id);

            // todo: delete data locate
            await deleteCoordinate(context, `id = '${locate.coordinates_id}'`)

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    status: 'OK'
                }
            };
        } catch (error) {
            context.log('-------------- error deleteSelfLocate: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    getAreaDelimitation: async (context, _) => {
        context.log('======= getAreaDelimitation =======');
        
        let areaDelimitation;
        try {
            areaDelimitation = await getAreaDelimitation(context);
            context.log('getAreaDelimitation ----', areaDelimitation);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    areaDelimitation: areaDelimitation,
                }
            };
        } catch (error) {
            context.log('-------------- error getAreaDelimitation: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    setAreaDelimitation: async (context, req) => {
        context.log('======= setAreaDelimitation =======');

        const {
            user_id, status, genotype, coordinateDetails, name, provider, note
        } = req.body;

        try {
            await setAreaDelimitation(context, user_id, name, provider, note, status, genotype, coordinateDetails);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    message: "OK"
                }
            };
        } catch (error) {
            context.log('-------------- error setAreaDelimitation: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    getGenotypes: async (context, _) => {
        context.log('======= getGenotypes =======');

        try {
            let genotypes = await getGenotypes(context);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    genotypes: genotypes
                }
            };
        } catch (error) {
            context.log('-------------- error setAreaDelimitation: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    deleteAreaDelimitation: async (context, req) => {
        context.log('======= deleteAreaDelimitation =======');
        const {
            id
        } = req.body;

        try {
            let detailDelimatation = await getDetailDelimitation(context, id);

            // todo: delete data area
            await deleteDetailDelimitation(context, id);
            await deleteAreaDelimitation(context, id);

            // todo: delete data coordinate
            let list_coordinates = detailDelimatation.map(detail => {
                return `(id = '${detail.coordinates_id}')`
            }).join(' or ');
            await deleteCoordinate(context, list_coordinates)

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    status: 'OK'
                }
            };
        } catch (error) {
            context.log('-------------- error deleteAreaDelimitation: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    getProvider: async (context, _) => {
        context.log('======= getProvider =======');

        try {
            let provider = await getProvider(context);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    provider: provider
                }
            };
        } catch (error) {
            context.log('-------------- error getProvider: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error
                }
            }
        }
    },
    setProvider: async (context, req) => {
        context.log('======= setProvider =======');

        const {
            name
        } = req.body;

        try {
            let checkProvider = await checkProviderExists(context, name);
            if (checkProvider) {
                context.res = {
                    status: 400,
                    body: {
                        message: 'Provider name already exists!'
                    }
                }
            } else {
                await createNewProvider(context, name);
    
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: {
                        status: 'OK'
                    }
                };
            }
        } catch (error) {
            context.log('-------------- error setProvider: ', error);
            context.res = {
                status: 400,
                body: {
                    message: error == '' ? error.message : error
                }
            }
        }
    },
}

class Locate {
    constructor (status, title, content, image ) {
        this.status = status;
        this.title = title;
        this.content = content;
        this.image = image;
    }

    setCoordinatesId(coordinates_id) {
        this.coordinates_id = coordinates_id;
    }

    setImage (image) {
        this.image = image;
    }
}

module.exports = handle;