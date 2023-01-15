const { register, checkExists } = require("../databases/register");

const registerController = {
    register: async (context, email, name, password) => {
        try {
            let check = await checkExists(context, email);
            if (check) {
                context.log(check)
                throw new Error("Email already exists!");
            }
            await register(context, email, name, password);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = registerController;