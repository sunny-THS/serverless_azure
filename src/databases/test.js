const { connectDB } = require('./init');

const testDB = {
    getDB: async (context) => {
        try {
            let connect = await connectDB(context);

            context.log("Reading rows from the Table...");  
            context.log(connect);  

            var resultSet = await connect
                .request()
                .query(`
                    SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName 
                    FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p 
                        ON pc.productcategoryid = p.productcategoryid
                `);
                 // output column headers
            var columns = "";
            for (var column in resultSet.recordset.columns) {
                columns += column + ", ";
            }
            context.log("%s\t", columns.substring(0, columns.length - 2));

            // ouput row contents from default record set
            resultSet.recordset.forEach(row => {
                context.log("%s\t%s", row.CategoryName, row.ProductName);
            });

            // close connection only when we're certain application is finished
            connect.close();

            context.log(`${resultSet.recordset.length} rows returned.`);

            return resultSet.recordset;
        } catch (err) {
            context.log('testdb', err.message);
            throw err;
        }
    }
};

module.exports = testDB