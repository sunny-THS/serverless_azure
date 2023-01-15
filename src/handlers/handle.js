const { login } = require("../controllers/login");
const { register } = require("../controllers/register");

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

    
}

module.exports = handle;