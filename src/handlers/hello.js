'use strict';

const { getDb } = require("../controllers/test");

module.exports.sayHello = async (context, req) => {
  context.log('JavaScript HTTP trigger function processed a request.');
  let db;
  try {
    db = await getDb(context);
    context.log('db----', db);
  } catch (error) {
    context.log('hello', error);
  }
  
  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {
        message: 'Hello ' + (req.query.name || req.body.name),
        db: db,
        hi: 'hi'
      }
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
    };
  }
};
