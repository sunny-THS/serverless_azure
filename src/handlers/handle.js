if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const { getLocates, setSelfLocate } = require("../controllers/locate");
const { getAreaDelimitation, setAreaDelimitation } = require("../controllers/areaDelimitation");

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
            user_id, status, coordinateDetails
        } = req.body;

        try {
            await setAreaDelimitation(context, user_id, status, coordinateDetails);

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