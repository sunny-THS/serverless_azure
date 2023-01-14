const { getDB } = require("../databases/test");

const test = {
    getDb: async (context) => getDB(context)
}

module.exports = test;