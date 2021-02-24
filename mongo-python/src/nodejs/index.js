"use strict";
exports.__esModule = true;
var fs = require("fs");
var dynamic_mongo_query_1 = require("./dynamic-mongo-query");
var finalQuery = dynamic_mongo_query_1.GetFinalQuery();
// writing query in json file
fs.writeFile('../query/genrated_query.json', finalQuery, function (err) {
    if (err)
        return console.log(err);
    console.log('query updated');
});
