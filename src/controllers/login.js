const { login } = require("../databases/login");

const loginController = {
    login: async (context, email, password) => {
        try {
            let rs = await login(context, email, password);
            if (rs) {
                context.log('------ result login:', rs)

                return rs;
            }
            return null;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = loginController;